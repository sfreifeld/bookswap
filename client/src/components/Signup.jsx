import React from "react";
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Signup( {setUser}) {
    const navigate = useNavigate()

    const handleSignInClick = () => {
        navigate('/')
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
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                username,
                password
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
            setUser(data.user)
            navigate('/home')
        })
        .catch(error => {
            console.error('Signup error:', error)
            alert('User could not be created')
        })
    }

    
    
    return (
        <>
    
        <div className="h-screen w-screen flex items-center justify-center flex-col space-y-4">
          <h2 className="text-4xl font-semibold py-12">Welcome to Book Swap!</h2>
                <form className="bg-white w-1/4 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e)=>handleSignUp(e)}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} onBlur={handleEmailError}/>
                    {emailError && <div className ='text-red-600 text-sm italic m-1'>{emailError}</div>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} onBlur={handleUsernameError}/>
                    {usernameError && <div className ='text-red-600 text-sm italic m-1'>{usernameError}</div>} 
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Confirm Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password-confirmation" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} onBlur={handleConfirmPasswordErrror}/>
                    {confirmPasswordError && <div className ='text-red-600 text-sm italic m-1'>{confirmPasswordError}</div>}
                  </div>
                  <div className="flex items-center justify-center">
                    <button className="px-5 py-2.5 font-medium bg-purple-50 hover:bg-purple-100 hover:text-purple-600 text-purple-500 rounded-lg" type="submit">
                      Create Account
                    </button>
                  </div>
                </form>
                <p className = "text-sm italic"> Already have an account?  Click here to sign in!</p>
              <button onClick={handleSignInClick} className="px-5 py-2.5 font-medium bg-purple-50 hover:bg-purple-100 hover:text-purple-600 text-purple-500 rounded-lg">
                      Sign In
              </button>
              </div>
        </>
    )
}

export default Signup