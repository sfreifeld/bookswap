import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from "./NavBar";


function Profile( { user, setUser }) {

    const { userId } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [description, setDescription] = useState(user.description || '');


    useEffect(() => {
        fetch(`/api/profile/${userId}`)
            .then((r) => r.json())
            .then((userData) => {
                setUser(userData);
            })
            .catch((error) => {
                console.error('Error fetching user details:', error);
            });
    }, [userId])


    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };


    const saveDescription = () => {
        // API call to save the description
        fetch(`/api/profile/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description }),
        })
        .then(response => response.json())
        .then(data => {
            setUser(data);
            setEditMode(false);
        })
        .catch(error => console.error('Error updating description:', error));
    };






    return (

    <>
        <NavBar user={user} setUser={setUser} />
        <section className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
            <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                <div className="relative">
                    <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/>
                </div>
                </div>
                <div className="w-full px-4 text-center mt-20">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        22
                    </span>
                    <span className="text-sm text-blueGray-400">Events Attended</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        10
                    </span>
                    <span className="text-sm text-blueGray-400">Events Created</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        89
                    </span>
                    <span className="text-sm text-blueGray-400">Other Things</span>
                    </div>
                </div>
                </div>
            </div>
            <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                { user.username }
                </h3>
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center ">
                <div className="w-full lg:w-9/12 px-4 ">
                {editMode ? (
                        <>
                            <textarea
                                className="mb-4 text-xs leading-relaxed text-blueGray-700 w-full h-48 border border-gray-200 p-2"
                                value={description}
                                placeholder="Tell us about yourself! Share your favorite genres, authors, or books. You can also mention what you’re currently reading or what's on your wishlist. Feel free to add any other interests that might help others connect with you. Happy swapping!"
                                onChange={handleDescriptionChange}
                            />
                            <button onClick={saveDescription}>Save</button>
                        </>
                    ) : (
                        <>
                            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                {description}
                            </p>
                            <button onClick={() => setEditMode(true)}>Edit</button>
                        </>
                    )}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        <footer className="relative  pt-8 pb-6 mt-8">
        </footer>
        </section>
        </>
    )
    }

    export default Profile