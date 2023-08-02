import React, { useEffect } from 'react'
import netflix_img from '../assets/netflix_transparent.png'
import user_icon from '../assets/netflix_penguin.png'
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
          <img className="nav__logo"src={netflix_img} alt="netflix-logo"/>

         <img className="nav__avatar" src={user_icon} alt="user-avatar" onClick={()=>navigate('/profile',{replace: true})}/>




      </div>
    
    </div>
  )
}

export default Nav