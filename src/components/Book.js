import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleRead } from '../store/booksSlice';

function Book({book}) {
    const dispatch = useDispatch();

    function handleToggleRead(event, id) {

        event.preventDefault(); //prevent clicking other elements
        dispatch(toggleRead(id)); //toggle read/unread 

        
    }

    return (
      <>
         <Link to={'/book/' + book.id}>
         <div className="book">
              {
                  book.isRead && 
                  <div className="readIt">
                      <i className="fa-solid fa-eye"></i>
                  </div>
              }
              
              <div className="book-cover">
                  <img src={book.cover} alt = ''/>
  
                  <button onClick = {(event) => handleToggleRead(event, book.id)} className={book.isRead ? 'isRead' : ''}>
                      <i className="fa-solid fa-eye"></i>
                      <span>{ book.isRead ? "Already Read It" : "Haven't Read it yet" }</span>
                  </button>
              </div>
  
              <div className="book-details">
                  <p className="book-author">{ book.author }</p>
                  <h3 className="book-title">{ book.title }</h3>
              </div>
          </div>
         </Link>
          
  
      </>
    )
  }
  
  export default Book
  