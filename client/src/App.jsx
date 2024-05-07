import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import { useState } from 'react'

import Signin from "./components/Signin"
import Signup from "./components/Signup"
import Home from "./components/Home"
import Profile from "./components/Profile"


import './App.css'
import './tailwind.css'


function App() {
  const [user, setUser] = useState(null);


  return (
    <Router>
        <Routes>
          <Route path="/signin" element={<Signin setUser={setUser}/>} />
          <Route path="/home" element={<Home user={user} setUser={setUser}/>} /> 
          <Route path="/createaccount" element={<Signup setUser={setUser}/>} /> 
          <Route path="/profile" element={<Profile user={user} setUser={setUser}/>} />
        </Routes>
    </Router>
  );
}

export default App;