import React from "react";
import { useNavigate } from "react-router-dom"

function Signup() {
    const navigate = useNavigate()

    const handleSignInClick = () => {
        navigate('/signin')
    }
    
    
    return (
        <>
            <p> Welcome to BookSwap!</p>
            <form>
                <input placeholder="Email Address"></input>
                <input placeholder="Username"></input>
                <input type="password" placeholder="Password"></input>
                <input type="password" placeholder="Confirm password"></input>
                <button type="submit">Create Account</button>
            </form>
            <p>Already have an account? Click here to sign in</p>
            <button onClick={handleSignInClick}>Sign In</button>
        </>
    )
}

export default Signup