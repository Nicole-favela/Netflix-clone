import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { useSelector } from "react-redux";
import { selectUser } from '../features/userSlice'

const PrivateRoutes = () => { 
  const user = useSelector(selectUser)
  console.log("user in privateroutes is: ", user)
  return (
    user ? <Outlet/> : <Navigate to= "/login"/>
  )
}
export default PrivateRoutes
