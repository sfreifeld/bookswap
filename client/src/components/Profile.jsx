import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from "./NavBar";
import Footer from "./Footer";
import avatar1 from "../assets/1.png"
import avatar2 from "../assets/2.png"
import avatar3 from "../assets/3.png"
import avatar4 from "../assets/4.png"
import avatar5 from "../assets/5.png"
import avatar6 from "../assets/6.png"
import avatar7 from "../assets/7.png"
import avatar8 from "../assets/8.png"
import avatar9 from "../assets/9.png"
import avatar10 from "../assets/10.png"







function Profile( { user, setUser }) {

    const { userId } = useParams();
    const [profileUser, setProfileUser] = useState(undefined)
    const [editMode, setEditMode] = useState(false);
    const [description, setDescription] = useState(user ? user.description : '');
    const [selectedAvatarId, setSelectedAvatarId] = useState(user ? user.avatar_id : 5);
    const [eventsAttended, setEventsAttended] = useState(0)
    const [eventsCreated, setEventsCreated] = useState(0)
    const [filteredEvents, setFilteredEvents] = useState([]);

    const navigate = useNavigate();

    


    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10]


    useEffect(() => {
        fetch(`/api/profile/${userId}`)
            .then((r) => r.json())
            .then((userData) => {
                setProfileUser(userData);

            })
            .catch((error) => {
                console.error('Error fetching user details:', error);
            });
    }, [userId ])

    useEffect(() => {
        fetch(`/api/attendees/${userId}`)
            .then((r) => r.json())
            .then((userData) => {
                console.log((userData))
                setEventsAttended((userData.length));
                const eventIds = userData.map(attendee => attendee["event_id"]);

            // Fetch all events then filter them
            fetch(`/api/events`)
                .then(res => res.json())
                .then(allEvents => {
                    const userEvents = allEvents.filter(event => eventIds.includes(event.id));
                    setFilteredEvents(userEvents)
                    // Process filtered events here
                });
        })
            .catch((error) => {
                console.error('Error fetching user metrics:', error);
            });
    }, [userId ])

    useEffect(() => {
        fetch(`/api/events/${userId}`)
            .then((r) => r.json())
            .then((userData) => {
                setEventsCreated((userData.length));

            })
            .catch((error) => {
                console.error('Error fetching user metrics:', error);
            });
    }, [userId ])





    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleAvatarChange = (newAvatarId) => {
        setSelectedAvatarId(newAvatarId);
    };


    const saveProfile = () => {
        const updatedUser = {
            description,
            avatar_id: selectedAvatarId
        };
        // API call to save the profile changes
        fetch(`/api/profile/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
        .then(response => response.json())
        .then(data => {
            setUser(data);
            setEditMode(false);
        })
        .catch(error => console.error('Error updating profile:', error));
    };


    function handleDeleteAccount() {
        fetch(`/api/profile/${userId}`, {
            method: "DELETE",
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message); // Log the server's response message
            setUser(undefined)
            navigate('/'); // Redirect user after account deletion
        })
        .catch((error) => {
            console.error('Error deleting account:', error);
        });
    }




    return (

        <>
        <NavBar user={user} setUser={setUser} />
        <section className="w-screen">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 mt-16">
            <div className="px-6">
            <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                <div className="relative">
                    <img alt="avatar" src={profileUser && profileUser.id != user.id ? avatars[profileUser.avatar_id - 1] : avatars[selectedAvatarId - 1]} className="shadow-xl rounded-full w-32"/>
                </div>
                </div>
                
                {editMode && (
                                    <div className="w-full px-4 flex justify-center flex-wrap">
                                        {avatars.map((avatar, index) => (
                                            <img key={index} src={avatar} alt={`avatar ${index + 1}`} className={`shadow-xl rounded-full w-16 m-1 ${selectedAvatarId === index + 1 ? 'border-4 border-blue-500' : ''}`} onClick={() => handleAvatarChange(index + 1)} />
                                        ))}
                                    </div>
                                )}
                 <h3 className="text-3xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2 pt-5">
                { profileUser ? profileUser.username : "" }
                </h3>
                <div className="w-full px-4 text-center mt-10">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    { eventsAttended }
                    </span>
                    <span className="text-sm text-blueGray-400">Events Attended</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    { eventsCreated }
                    </span>
                    <span className="text-sm text-blueGray-400">Events Created</span>
                    </div>
                </div>
                </div>
            </div>
            <div className="text-center mt-12">
            <p className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2 underline">User  Events</p>
            <ul>
                {filteredEvents.map((event, index) => (
                    <li key={index}>{event.name} - {event.date}</li> // Adjust according to your event object properties
                ))}
            </ul>
            </div>
            <div className="border-t border-blueGray-200 text-center ">
                <div className="flex flex-wrap justify-center ">
            
               <div className="w-full lg:w-9/12 space-y-4 p-24">
                
                {profileUser && (
                    profileUser.id === user.id ? (
                        <>
                            {editMode ? (
                                <>
                                    <textarea
                                        className="mb-4 text-xs leading-relaxed text-blueGray-700 w-full h-48 border border-gray-200 p-2"
                                        value={description}
                                        placeholder="Tell us about yourself! Share your favorite genres, authors, or books. You can also mention what you're currently reading or what's on your wishlist. Feel free to add any other interests that might help others connect with you. Happy swapping!"
                                        onChange={handleDescriptionChange}
                                    />
                                    <button className="px-5 py-2.5 font-medium bg-purple-50 hover:bg-purple-100 hover:text-purple-600 text-purple-500 rounded-lg" onClick={saveProfile}>Save</button>
                                </>
                            ) : (
                                <>
                                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700 w-full h-48 border border-gray-200 p-2">
                                        {description}
                                    </p>
                                    <button className="px-5 py-2.5 font-medium bg-purple-50 hover:bg-purple-100 hover:text-purple-600 text-purple-500 rounded-lg" onClick={() => setEditMode(true)}>Edit</button>
                                </>
                            )}
                            <br></br>
                            <button 
                                className="px-5 py-2.5 font-medium bg-red-50 hover:bg-red-100 hover:text-red-600 text-red-500 rounded-lg"
                                onClick={() => {
                                    if (window.confirm("Are you sure you want to delete your account? This action can't be undone.")) {
                                        handleDeleteAccount()
                                        console.log("Account deletion confirmed");
                                    } else {
                                        console.log("Account deletion canceled");
                                    }
                                }}
                            >
                                Delete Account
                            </button>
                        </>
                    ) : (
                        <div>
                            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">{profileUser.description}</p>
                        </div>
                    )
                )}
                
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <Footer/>
        </>
    )
    }

    export default Profile

