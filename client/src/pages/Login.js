import React, {useState} from 'react'
import './Login.css'
import Button from '@mui/material/Button';


import nav_film_icon from '../assets/movie_icon3.png'
import SignIn from './SignIn';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/apiUrls';


//sign up page to create account or sign in
function Login() {
  const [signIn, setSignIn]= useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  //for creating a new user
  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
     
    try {
      const form = {
        email,
        password,
      }
      const res = await fetch(`${API_BASE_URL}/auth/api/register`,{
        method: "POST",
        body: JSON.stringify(form),
        headers: {
            'content-type': "application/json"
        }
    })
    if(res.ok){
      console.log(res)
      console.log("success")
      navigate("/")// go to home page
      setSignIn(true)
    }
    if(!res.ok){
      const errorData = await res.json()
      throw new Error(errorData.message)

    }
     
    } catch (error) {
      setError(error.message)
      
    }
  };
  //const [signUp, setSignUp] = useState(false)
  return (
    <div className='login'>
        <div className='login__backgroundimg'>
            <img 
                className ='login__logo' 
                src={nav_film_icon}
                alt=""
            />
            <button onClick={()=> setSignIn(true)} className='login__button'>
                Sign In
            </button>
            <div className='login__gradient' />
            
             {/* <Button className='login___button' variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>Sign In</Button> */}
        </div>

        <div className='login__body'>
          {signIn ? (
            <SignIn/>
          ): (
            
       
          <>
          <h1>See what's next.  </h1>
          <h2>Cancel anytime.</h2>
          {error && <p style={{color: 'red', fontSize: '15px'}}>{error}</p>}
          <div className='login__input'>
            <form>
              <input type="email" placeholder='Email 
              Address' value={email} onChange={(e) => setEmail(e.target.value)}/>
              <br/>
              <br/>
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <br/>
              <button onClick={handleFormSubmit}  className='login__enterbtn'>Create Account</button>
            </form>
          </div>
          
          </>
          )}

        </div>
    
    </div>
  )
}

export default Login