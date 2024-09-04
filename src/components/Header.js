import {NavLink} from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../firebase/config';
import { setUser } from '../store/usersSlice';



function Header({pageTitle}) {

   function handleSignout() {
    signOut(auth).then(() => {
      //cleaning state by setting user to null on sign out..
      dispatchEvent(setUser(null));
      
    }).catch((error) => {
      console.log(error.msg);
    });
   }

    return (
      <>

            <h1>{pageTitle}</h1>

            <div className="header-btns">
                <NavLink to='/'>
                    <button className="btn">
                        Books
                    </button>
                </NavLink>


                 <NavLink to='/add-book'>
                    <button className="btn">
                        Add Book +
                    </button>
                  </NavLink>   

                  <button onClick = {handleSignout} className="btn transparent">
                      Logout
                    </button>


                    
               
            </div>
    
      </>
    )
  }
  
  export default Header
  