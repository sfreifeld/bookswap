import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Signin from "./components/Signin"
import Signup from "./components/Signup"

import './App.css'


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/signin" element={<Signin/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;