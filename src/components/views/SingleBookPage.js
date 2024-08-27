import Notes from '../Notes';
import {useParams, Link, useNavigate} from 'react-router-dom';
import { selectBooks, eraseBook, toggleRead } from '../../store/booksSlice';
import { useSelector, useDispatch } from 'react-redux';
 

function SingleBookPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleEraseBook(id) {
        dispatch(eraseBook(id));
        navigate('/');
    }

    const {id} = useParams();
    const books = useSelector(selectBooks);//getting books through state created in redux...
      const book = books.filter(book => book.id == id)[0];
    
    return (
      <>
      
      <div className="container">
            <Link to ='/'>
                <button className="btn">
                    ← Back to Books
                </button>
            </Link>
            {book ?
              <div>
              <div className="single-book">
                      <div className="book-cover">
                          <img src={book.cover} alt='' />
                      </div>
  
                      <div className="book-details">
                          <h3 className="book-title">{ book.title }</h3>
                          <h4 className="book-author">{ book.author }</h4>
                          <p>{book.synopsis}</p>
                          <div className="read-checkbox">
                              <input onClick={() => dispatch(toggleRead(book.id))} type="checkbox" defaultChecked={book.isRead} />
                              <label>{ book.isRead ? "Already Read It" : "Haven't Read it yet" }</label>
                          </div>
                          <div onClick = {() => handleEraseBook(book.id)} className="erase-book">
                              Erase book
                          </div>
                      </div>
                      
              </div>
  
              <Notes bookId = {id} />
  
              </div> :
              <div>
                <p>Book doesn't exist.</p>
              </div>
            }
            
            

            
        </div>
      
       

        
      </>
    )
  }
  
  export default SingleBookPage
  