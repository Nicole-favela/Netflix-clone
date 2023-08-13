import React, { useEffect } from 'react';

import Home from './pages/Home';
import Login from './pages/Login'
import {useDispatch, useSelector} from "react-redux"
import {login, logout, selectUser} from "./features/userSlice"
import Profile from './pages/Profile';
import Cookies from "js-cookie";
import PrivateRoutes from './utils/PrivateRoutes';

import './App.css';
import {
  BrowserRouter as Router,
  Routes, 
  Route
} from "react-router-dom"

function App() {

  const dispatch = useDispatch()
  //const user = useSelector(selectUser)
  //let token = Cookies.get("token");
  let token = null;
  // useEffect(()=>{

  // },[user])
  //const user = {email: "dave@gmail.com"};
  // useEffect(()=>{
  //   if(loggedIn){
  //     //dispatch user object, email
  //     dispatch(login({}))

  //   }else{
  //     dispatch(logout)
  //   }

  // },[])
  const user = null;
  
  //const user = useSelector(selectUser); //gives you the user
  return (
    <div className="app">
      <Router>
        {/* {!token?(
          <Login/>
        ): ( */}
          <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route element={<Home/>} path='/'exact/>
                <Route element={<Profile/>} path='/profile'exact/>
            </Route>

            {/* <Route path="/profile" element={}>
            
            </Route> */}


            <Route  element={ <Login/>} path="/login" />
            
         

         </Routes>


        
      
      </Router>
     
    </div>
  );
}

export default App;
