import React, {useState} from 'react'
import './Login.css'
import Button from '@mui/material/Button';
import netflixbackground from '../assets/Netlfix_dummy_banner.webp'
import netflixlogo from '../assets/Netflix-logo-on-transparent-background.png'
import SignIn from './SignIn';
import axios from 'axios'


//sign up page to create account or sign in
function Login() {
  const [signIn, setSignIn]= useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //for creating a new user
  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
     
    try {
      // Send a POST request to the backend API for user registration
      // const response = await axios.post('http://localhost:3001/api/register', {
      //   email,
      //   password,
      // });
      
      // console.log(response.data.message);
      const form = {
        email,
        password,
      }
      const res = await fetch('http://localhost:3001/api/register',{
        method: "POST",
        body: JSON.stringify(form),
        headers: {
            'content-type': "application/json"
        }
    })
    if(res.ok){
      console.log(res)
      console.log("success")
      setSignIn(true)
    }
      // You can handle the success message or redirect the user here
    } catch (error) {
      console.error(error);
    }
  };
  //const [signUp, setSignUp] = useState(false)
  return (
    <div className='login'>
        <div className='login__backgroundimg'>
            <img 
                className ='login__logo' 
                src={netflixlogo}
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