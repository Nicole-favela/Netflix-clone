import React from 'react'
import './Login.css'
import Button from '@mui/material/Button';
import netflixbackground from '../assets/Netlfix_dummy_banner.webp'
import netflixlogo from '../assets/Netflix-logo-on-transparent-background.png'

function Login() {
  return (
    <div className='login'>
        <div className='login__backgroundimg'>
            <img 
                className ='login__logo' 
                src={netflixlogo}
                alt=""
            />
            <button className='login__button'>
                Sign In
            </button>
            <div className='login__gradient' />
            
             {/* <Button className='login___button' variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>Sign In</Button> */}
        </div>

        <div className='login__body'>
          <>
          <h1>See what's next.  </h1>
          <h2>Cancel anytime.</h2>
          <div className='login__input'>
            <form>
              <input type="email" placeholder='Email 
              Address'/>
              <button className='login__enterbtn'>Create Account</button>
            </form>
          </div>
          
          </>

        </div>
    
    </div>
  )
}

export default Login