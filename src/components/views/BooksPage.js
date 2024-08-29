import Header from '../Header';
import Book  from '../Book';
import { selectBooks } from '../../store/booksSlice';
import { useSelector } from 'react-redux';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';

function BooksPage() {

  //const books = useSelector(selectBooks);//getting books through state created in redux...
  const[books, setBooks] = useState([]);
  const pageTitle = "📖 Book List with React Router & Redux Toolkit";
  
  //using useEffect() hook to fetch data ...
  useEffect( () => {
    const fetchBooks = async() => {
      const q = query(collection(db, "books"));
      const querySnapshot = await getDocs(q);
      let booksList = [];
      querySnapshot.forEach((doc) => {
        booksList.push({id:doc.id, ...doc.data()});
      })
      setBooks(booksList);
      
    }
    fetchBooks();
  
      
  },[]);
 


    
    return (
      <>
        <div className="container">
            <Header pageTitle={pageTitle} />
            <div className="books-container">
                <div className="books-list">
                    
                    {books.map(book => 
                    
                    <Book key={book.id} book={book}  />
                    
                    )}

                </div>
            </div>
        </div>
      </>
    )
  }
  
  export default BooksPage
  