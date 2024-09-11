
import {useState} from 'react';
import FullPageLoader from '../FullPageLoader.js';
import { auth } from '../../firebase/config.js';
import {  createUserWithEmailAndPassword, 
          sendPasswordResetEmail, 
          signInWithEmailAndPassword,
          onAuthStateChanged} from "firebase/auth";

import { useDispatch } from 'react-redux';
import { setUser } from '../../store/usersSlice';



function LoginPage() {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState('login');
  const [userCredentials, setUserCredentials] = useState({}); //userCredentials to handle multiple inputs of form
  const [error, setError] = useState(''); 

   onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({id : user.uid , email: user.email}));
      
    } else {
        dispatch(setUser(null));
    }
    //loading loader on state change 
    if(isLoading) {setIsLoading(false)};
  });
   

  function handleCredentails(event) {
    setUserCredentials({...userCredentials, [event.target.name] : event.target.value})
    
  }
   
  function handleSignup(event){
      event.preventDefault();
      setError('');

      //using in-built function from firebase for sign-up authentication..

      createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
          //this has been implemented through state observer function from fire base
          /* .then((userCredential) => {
              dispatch(setUser({id: userCredential.user.uid, email : userCredential.user.email}));
          }) */
        .catch((error) => {
            
            setError(error.message);
        });
    }
    function handleSignin(event) {
        event.preventDefault();

        //using in-built function from firebase for sign-in authentication..

        signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)

        //this has been implemented through state observer function from fire base
        /* .then((userCredential) => {
           dispatch(setUser({id: userCredential.user.uid, email : userCredential.user.email}));
        }) */ 
       .catch((error) => {
           setError(error.message);
       });
    }

    function handlePasswordReset() {
        const email = prompt('Please enter your email');
        sendPasswordResetEmail(auth, email);
        alert('Check your email for password reset link');
    }

    return (
      <>
        { isLoading && <FullPageLoader></FullPageLoader> }
        
        <div className="container login-page">
          <section>
            <h1>Welcome to the Book App</h1>
            <p>Login or create an account to continue</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Login
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Signup
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label>Email *</label>
                      <input onChange = {(event)=>handleCredentails(event)} type="text" name="email" placeholder="Enter your email" />
                  </div>
                  <div className="form-control">
                      <label>Password *</label>
                      <input onChange = {(event)=>handleCredentails(event)} type="password" name="password" placeholder="Enter your password" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button onClick = {(event) => {handleSignin(event)}} className="active btn btn-block">Login</button>
                    : 
                    <button onClick={(event) => {handleSignup(event)}} className="active btn btn-block">Sign Up</button>
                  }
                  {
                    error &&
                    <div className = 'error'>
                        {error}
                    </div>

                  }
                  

                  <p onClick = {handlePasswordReset} className="forgot-password">Forgot Password?</p>
                  
              </form>
          </section>
        </div>
      </>
    )
  }
  
  export default LoginPage
  