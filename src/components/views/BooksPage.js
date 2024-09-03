import Header from '../Header';
import Book  from '../Book';
import { selectBooks, fetchBooks } from '../../store/booksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectUsers } from '../../store/usersSlice';


function BooksPage() {
   
   const dispatch = useDispatch();
   const books = useSelector(selectBooks).books; //getting books through state created in redux...
   const pageTitle = "📖 Book List with React Router & Redux Toolkit";
   const bookStatus = useSelector(selectBooks).status; //getting books status from books slice...
  
  //using useEffect() hook to fetch data ...
  useEffect( () => {
    //to avoid infinite loop , excute dispatch action only in idle status
    if(bookStatus == 'idle'){
      dispatch(fetchBooks());
    }
   
      
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
  