import React, { useEffect } from 'react'
import nav_film_icon from '../assets/movie_icon3.png'
import user_icon from '../assets/user_icon2.png'
import { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import "./Nav.css"

function Nav() {
  const [show, handleShow] = useState(false)
  const navigate = useNavigate()
  const transitionNavBar = ()=>{
    //makes top navbar disappear when user scrolls down
    if (window.scrollY> 100){
      handleShow(true)

    }
    else{
      handleShow(false)
    }
  }
  useEffect(()=>{
    window.addEventListener("scroll", transitionNavBar) //listens to scroll event of user
    //clean up when component mounts
    return ()=> window.removeEventListener("scroll", transitionNavBar)

  },[])
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className='nav__contents'>
          <img className="nav__logo"src={nav_film_icon} alt="logo" onClick={()=>navigate('/',{replace: true})}/>

         <img className="nav__avatar" src={user_icon} alt="user-avatar" onClick={()=>navigate('/profile',{replace: true})}/>




      </div>
    
    </div>
  )
}

export default Nav