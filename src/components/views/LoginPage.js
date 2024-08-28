
import {useState} from 'react';
import FullPageLoader from '../FullPageLoader.js';
import { auth } from '../../firebase/config.js';
import {  createUserWithEmailAndPassword } from "firebase/auth";


function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState('login');
  const [userCredentials, setUserCredentials] = useState({}); //userCredentials to handle multiple inputs of form
  const [error, setError] = useState(''); 

  function handleCredentails(event) {
    setUserCredentials({...userCredentials, [event.target.name] : event.target.value})
    
  }
   
  function handleSignup(event){
      event.preventDefault();

      //using in-built function from firebase..
      createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
        .then((userCredential) => {
             
            const user = userCredential.user;
         
        })
        .catch((error) => {
            
            setError(error.message);
        });
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
                    <button className="active btn btn-block">Login</button>
                    : 
                    <button onClick={(event) => {handleSignup(event)}} className="active btn btn-block">Sign Up</button>
                  }
                  {
                    error &&
                    <div className = 'error'>
                        {error}
                    </div>

                  }
                  

                  <p className="forgot-password">Forgot Password?</p>
                  
              </form>
          </section>
        </div>
      </>
    )
  }
  
  export default LoginPage
  