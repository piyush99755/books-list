import Header from '../Header';
import Book  from '../Book';
import { selectBooks } from '../../store/booksSlice';
import { useSelector } from 'react-redux';

function BooksPage() {

  const books = useSelector(selectBooks);//getting books through state created in redux...
    
  const pageTitle = "📖 Book List with React Router & Redux Toolkit";
    
    
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
  