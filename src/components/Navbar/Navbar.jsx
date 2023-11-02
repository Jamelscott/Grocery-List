import React from "react";
import "../../App.css";

function Navbar({setCurrentUser, currentUser}) {
  const handleLogout = () => {
    // remove the token from the localstorage
    if (localStorage.getItem('jwt')) localStorage.removeItem('jwt');
    // set the userState to be null so that user is logged out
    setCurrentUser(null)
  }
    return ( 
        <>
           {currentUser && <button className="logoutButton" onClick={handleLogout}>Logout</button>}
        </>
     );
}

export default Navbar;