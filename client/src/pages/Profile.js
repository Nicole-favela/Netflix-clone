import React from 'react'
import Nav from '../components/Nav'
import "./Profile.css"
import user_icon from '../assets/netflix_penguin.png'
import { UseSelector, useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

function Profile() {
    const user = useSelector(selectUser)
    function signOut(){
        return null
    }
  return (
    <div className='profile'>
        <Nav/>
        <div className='profile__body'>
            <h1>Edit Profile</h1>
            <div className='profile__info'>
                <img src={user_icon} alt =""/>
                <div className='profile__details'>
                    <h2>{user?.email}</h2>
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