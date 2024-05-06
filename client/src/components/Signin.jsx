import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



function Signin( {setUser } ) {

    const [loginUser, setLoginUser] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const navigate = useNavigate();


    const handleSignUpClick = () => {
        navigate('/createaccount')
    }

    function login(e) {
        e.preventDefault()
        fetch('/api/login', 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                username: loginUser,
                password: loginPassword
            }
        )
        })
        .then(r=>{
            if (r.ok) {
                r.json().then((user) => {setUser(user)
                  navigate("/home") })
            }
            else {
                alert("Not valid login credentials")
                return undefined
            }
        })
        .catch(error => {
            console.error('Login Error:', error);
        });
    }






    return (
        <>
                <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) =>login(e)}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={loginUser} onChange={(e) => setLoginUser(e.target.value)}/>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
                  </div>
                  <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
              <p> Don't have an account yet?  Click here to sign up!</p>
              <button onClick={handleSignUpClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Sign Up
                    </button>
        </>
    )
}

export default Signin;