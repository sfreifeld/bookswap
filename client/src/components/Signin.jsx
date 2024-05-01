import React from "react";
import { useNavigate } from "react-router-dom"

function Signin() {
    const navigate = useNavigate()

    const handleSignUpClick = () => {
        navigate('/signup')
    }
    return (
        <>
        <form>
            <input placeholder="username"></input>
            <input type="password" placeholder="password"></input>
            <button type="submit">Login</button>
        </form>
        <p>Need to create an account? Click here to create an account.</p>
        <button onClick={handleSignUpClick}>Sign Up</button>
        </>
    )
}

export default Signin