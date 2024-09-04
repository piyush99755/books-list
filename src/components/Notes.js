import { useSelector, useDispatch } from "react-redux";
import { selectNotes, eraseNote, addNotes } from '../store/notesSlice';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";
import {db} from '../../src/firebase/config';

function Notes({bookId}) {
    
   
   const dispatch = useDispatch();
   
   //handling erasing notes..
   const  handleEraseNote = async(id) => {
    try{
        await deleteDoc(doc(db, "notes", id));
        setNotes(notes.filter(note => note.id != id));

    }catch(error){
        console.log('Error deleting notes');

    }
    
   }
   
   //handle adding notes...
   const handleAddNote = async(event) => {
        event.preventDefault();
        
        const newNote = {
          book_id: bookId,
          title: document.querySelector('input[name=title]').value,
          text: document.querySelector('textarea[name=note]').value,
        }

        if(newNote.title && newNote.text){
        try{
            const docRef = await addDoc(collection(db, 'notes'), newNote);
            newNote.id = docRef.id;
            setNotes([...notes, newNote]);
            document.querySelector('input[name=title]').value = '';
            document.querySelector('textarea[name=note]').value = '';
           }
        catch(error) {
            alert('Error adding new notes');
        }
        }else{
            alert('Fill out all required fields');
        }

        
    }
    
    //fetch notes... 
    const fetchNotes = async(bookId) => {
        try{
            const q = query(collection(db, "notes"), where("book_id", "==", bookId));
            const querySnapshot = await getDocs(q);
            const notesList = [];
            querySnapshot.forEach((doc) => {
             notesList.push({...doc.data(), id:doc.id});
            setNotes(notesList);
            });
            
            setFetchStatus('success');
    
          } catch(error){
            console.log('Error', error);
            setFetchStatus('error');
    
          }
    
    }
        
    const[notes, setNotes] = useState('');
    const[fetchStatus, setFetchStatus] = useState('idle');
    
    //using useEffect to fetch data... 
    useEffect( () => {
        if(fetchStatus == 'idle') {
            fetchNotes(bookId);
        }

    }, []);
        
    
    
    return (
      <>

        <div className="notes-wrapper">

            <h2>Reader's Notes</h2>
            {notes.length ?
              <div className="notes">
              {notes.map(note => 
                  <div key={note.id} className="note">
                      <div onClick= {() => handleEraseNote(note.id)} className="erase-note">Erase note</div>
                      <h3>{note.title}</h3>
                      <p>{note.text}</p>
                  </div>
                  )}
              </div>
                :fetchStatus == 'success' ?
                <div>
                    <p>Notes doesn't exist.</p>
                </div> 

                : fetchStatus == 'error' ?
                <div>
                <p>Error fetching notes.</p>
                </div> :
                <div>
                <p>Loading...</p>
                </div>
              
            }
            

            <details>
                <summary>Add a note</summary>
                <form className="add-note">
                    <div className="form-control">
                        <label>Title *</label>
                        <input type="text" name="title" placeholder="Add a note title" />
                    </div>
                    <div className="form-control">
                        <label>Note *</label>
                        <textarea type="text" name="note" placeholder="Add note" />
                    </div>
                    
                    <button onClick = {(event) => handleAddNote(event)} className="btn btn-block">Add Note</button>
                </form>
            </details>

        </div>

      </>
    )
  }
  
  export default Notes
  