import React from 'react';

import Home from './pages/Home';
import Login from './pages/Login'

import './App.css';
import {
  BrowserRouter as Router,
  Routes, 
  Route
} from "react-router-dom"

function App() {
  const user = null;
  return (
    <div className="app">
      <Router>
        {!user ?(
          <Login/>
        ): (
          <Routes>
            <Route path="/" element={ <Home/>}>
            
            </Route>

         </Routes>


        )}
      
      </Router>
     
    </div>
  );
}

export default App;
