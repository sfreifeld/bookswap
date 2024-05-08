import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, 
  Navigate
} from 'react-router-dom';

import { useState, useEffect } from 'react'

import Signin from "./components/Signin"
import Signup from "./components/Signup"
import Home from "./components/Home"
import Profile from "./components/Profile"
import { useNavigate } from 'react-router-dom';



import './App.css'
import './tailwind.css'


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/checksession").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setUser(user)
      })

      }
    });
  }, []);

  

  return (
    <Router>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Signin setUser={setUser}/>} />
          <Route path="/home" element={<Home user={user} setUser={setUser}/>} /> 
          <Route path="/createaccount" element={<Signup setUser={setUser}/>} /> 
          <Route path="/profile/:userId" element={<Profile user={user} setUser={setUser}/>} />
        </Routes>
    </Router>
  );
}

export default App;