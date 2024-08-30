import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db , auth } from '.././firebase/config';

const booksSlice = createSlice({
  name: 'books',
  initialState:{
    books: [],
    status: 'idle'
  },
  //list of reducers used in related components for certain functionality 
  reducers: {
       addBook: (books, action) => {
         let newBook = action.payload; //getting new book to get its id 
         newBook.id = books.length ? Math.max(...books.map(book => book.id)) + 1 : 1; //getting th highest number of id
         books.push(newBook);
       },
       

       eraseBook: (books, action) => {
        return books.filter(book => book.id != action.payload);

       },

       /* toggleRead: (books, action) => {
        books.map(book => {
          if(book.id === action.payload){
              book.isRead = !book.isRead;
          }
        });
       } */
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state, action) => {
        state.status = 'loading';
        console.log('loading');
      })
      
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        console.log('success');

      })
      

      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.payload;

      })

      .addCase(toggleRead.fulfilled, (state, action) => {
        //updating toggle read state
        state.books.map(book => {
          if(book.id == action.payload){
            book.isRead = !book.isRead;
          }
        })

      })
      

      .addCase(toggleRead.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.payload;

      })
      
  }

  
})


export const { addBook, eraseBook } = booksSlice.actions;

export const selectBooks = state => state.books;

export default booksSlice.reducer;

//using redux middleware createAsyncThunk and firestore in-built function to fetch books .
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const q = query(collection(db, "books"), where('user_id','==',auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      let booksList = [];
      querySnapshot.forEach((doc) => {
        booksList.push({id:doc.id, ...doc.data()});
      })
      return booksList;
});

export const toggleRead = createAsyncThunk('books/toggleRead', async (payload) => {
  const bookRef = doc(db, 'books', payload.id); 
  await updateDoc(bookRef, {
    isRead :!payload.isRead
  });
  return payload.id;
}); 