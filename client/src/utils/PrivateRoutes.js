import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { useSelector } from "react-redux";
import { selectUser } from '../features/userSlice'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';


const PrivateRoutes = () => { 
  //const user = useSelector(selectUser)
  
  const navigate = useNavigate()
  const token = Cookies.get('token')

  return (
    token ? <Outlet/> : <Navigate to= "/login"/>
  )
}
export default PrivateRoutes
