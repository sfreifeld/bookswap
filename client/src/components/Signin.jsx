import React from "react";
import { useNavigate } from "react-router-dom"
import { useState } from "react";


function Signin() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSignUpClick = () => {
        navigate('/signup')
    }

    const handleLogin = (event) => {
        event.preventDefault();
        fetch('http://localhost:5555/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(r => {
            if (r.ok) {
                console.log(r)
                return r.json();
            } else {
                console.log(r)
                throw new Error('Invalid credentials');
            }
        })
        .then(data => {
            navigate('/');
        })
        .catch(error => {
            alert(error.message);
        });
    }



    return (
        <>
        <form onSubmit={(e)=>handleLogin(e)}>
            <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} ></input>
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit">Login</button>
        </form>
        <p>Need to create an account? Click here to create an account.</p>
        <button onClick={handleSignUpClick}>Sign Up</button>
        </>
    )
}

export default Signin