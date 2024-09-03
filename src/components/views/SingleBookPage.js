import Notes from '../Notes';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {eraseBook, toggleRead } from '../../store/booksSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { eraseBookNotes } from '../../store/notesSlice';
import { useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import {db} from '../../firebase/config';
 

function SingleBookPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleEraseBook(id) {
        dispatch(eraseBook(id));
        //dispatch(eraseBookNotes(id));
        navigate('/');
    }

    function handleToggleRead(info) {
      dispatch(toggleRead({id: info.id, isRead: info.isRead})) //sending current state of book 
      setBook({...book, isRead: !info.isRead}); // overriding isRead property of book 

    }
    const fetchBook = async(book_id) => {
      try{
        const docRef = doc(db, "books", book_id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
           setBook({...docSnap.data(), id:docSnap.id}); // copying all properties from docSnap into new object and overriding its id..
        } 
        setFetchStatus('success');

      } catch(error){
        console.log('Error', error);
        setFetchStatus('error');

      }

    }

    const {id} = useParams(); 
    
    const [book, setBook] = useState('');
    const [fetchStatus, setFetchStatus] = useState('idle');

    useEffect(() => {
      if(fetchStatus == 'idle') {
        fetchBook(id);
      }
      
    }, []);
    
    return (
      <>
      d
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
                              <input onClick={() =>handleToggleRead({id: book.id, isRead: book.isRead})} type="checkbox" defaultChecked={book.isRead} />
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
  