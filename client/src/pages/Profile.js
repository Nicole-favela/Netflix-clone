import React from 'react'
import Nav from '../components/Nav'
import "./Profile.css"
import user_icon from '../assets/netflix_penguin.png'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../features/userSlice'
import {login, logout} from "../features/userSlice"
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'; 
import {jwtDecode} from 'jwt-decode'


function Profile() {
    //const user = useSelector(selectUser)
    const token = Cookies.get('token')
    const decoded = jwtDecode(token)
    const user_email = decoded.email
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function signOut(){
        Cookies.remove('token')
        navigate('/login') 
        dispatch(logout())
    }
  return (
    <div className='profile'>
        <Nav/>
        <div className='profile__body'>
            <h1>Edit Profile</h1>
            <div className='profile__info'>
                <img src={user_icon} alt =""/>
                <div className='profile__details'>
                    <h2>{user_email}</h2>
                     <div className='profile__plan'>
                        <h3>Current Plan: Premium</h3>
                        <button className='profile__signout'onClick={()=>signOut()}>sign out</button>
                     </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile