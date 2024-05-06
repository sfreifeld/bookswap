import React from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom"

function Home( {user, setUser}) {

    const navigate = useNavigate()

    function goProfile(e) {
        navigate("/profile")
    }



    return (
        <>
            
            < NavBar setUser ={setUser} user={user} />
            <div>
                {user ? `Hello ${user.username}` : "Hello World!"}
            </div>
            <button onClick={goProfile}>asdfghjmk</button>
            
        </>
    )
}

export default Home;