import { useSelector, useDispatch } from "react-redux";
import { selectNotes, eraseNote } from '../store/notesSlice';

function Notes({bookId}) {
    
   const notes = useSelector(selectNotes).filter(note => note.book_id == bookId ); //getting notes through state created in redux..
   const dispatch = useDispatch();

   function handleEraseNote(id) {
    dispatch(eraseNote(id));

   }
    
    
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
              :
              <p>This book does not have any notes.</p>
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
                    
                    <button className="btn btn-block">Add Note</button>
                </form>
            </details>

        </div>

      </>
    )
  }
  
  export default Notes
  