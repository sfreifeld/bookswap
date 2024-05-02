import React from "react";
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Signup() {
    const navigate = useNavigate()

    const handleSignInClick = () => {
        navigate('/signin')
    }


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleEmailError = () => {
        if (!email.includes('@')) {
            setEmailError("Email must include '@'");
        } else {
            setEmailError('');
        }
    }

    const handleUsernameError = () => {
        if (username.length < 6 || username.length > 20) {
            setUsernameError("Username must be between 6 and 20 characters");
        } else {
            setUsernameError('');
        }
    }

    const handleConfirmPasswordErrror = () => {
        if (password != confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError('');
        }
    }

    function validateInputs() {
        const emailValid = email.includes('@') && email !== '' ;
        const usernameValid = username.length >= 6 && username.length <= 20 && username !== '';
        const passwordsMatch = password === confirmPassword && confirmPassword !== '';

        return emailValid && usernameValid && passwordsMatch;
    }

    function handleSignUp(e) {
        e.preventDefault()
        if (!validateInputs()) {
            alert('Validation failed');
            return;
        }
        fetch('http://localhost:5555/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                email
            })
        })
        .then(r => {
            if (!r.ok) {
                alert('User could not be created')
            }
            return r.json()
        })
        .then(data => {
            alert(data.message)
            navigate('/')
        })
        .catch(error => {
            console.error('Signup error:', error)
            alert('User could not be created')
        })
    }

    
    
    return (
        <>
            <p> Welcome to BookSwap!</p>
            <form onSubmit={(e)=>handleSignUp(e)}>
                <input placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} onBlur={handleEmailError}></input>
                {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} onBlur={handleUsernameError}></input>
                {usernameError && <div style={{ color: 'red' }}>{usernameError}</div>}
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
                <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} onBlur={handleConfirmPasswordErrror}></input>
                {confirmPasswordError && <div style={{ color: 'red' }}>{confirmPasswordError}</div>}
                <button type="submit" disabled={!validateInputs()}>Create Account</button>
            </form>
            <p>Already have an account? Click here to sign in</p>
            <button onClick={handleSignInClick}>Sign In</button>
        </>
    )
}

export default Signup