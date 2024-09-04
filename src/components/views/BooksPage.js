import Header from '../Header';
import Book  from '../Book';
import { selectBooks, fetchBooks } from '../../store/booksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { Link } from 'react-router-dom';

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
              
               {
               books.length ?
                    <div className="books-list">
                    {books.map(book => 
                    <Book key={book.id} book={book}  />
                    )}
                    </div> : 
                    bookStatus == 'loading' ?
                    <div>No books found. <Link to='/add-book'>Click here</Link> to add more books.</div>
                    :
                    <div>Loading...</div> 
                    
                }
              </div>
        </div>
      </>
    )
  }
  
  export default BooksPage
  