import React, { useEffect } from 'react';

import Home from './pages/Home';
import Login from './pages/Login'


import Profile from './pages/Profile';

import PrivateRoutes from './utils/PrivateRoutes';



import './App.css';
import {
  BrowserRouter as Router,
  Routes, 
  Route
} from "react-router-dom"

function App() {

 
 
  return (
    <div className="app">
      <Router>
      
          <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route element={<Home />} path='/'exact/>
                <Route element={<Profile/>} path='/profile'exact/>
            </Route>

           
              <Route  element={ <Login/>} path="/login" />

         </Routes>
      </Router>
     
    </div>
  );
}

export default App;
