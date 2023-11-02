import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import GroceryList from "./components/GroceryList/GroceryList";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
// import { io } from 'socket.io-client'
import { jwtDecode } from "jwt-decode";
import Navbar from "./components/Navbar/Navbar";

// const socket = io('http://localhost:3001')
// socket.on('connect', ()=>{
//   console.log(`you connected with id: ${socket.id}`)
// })

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  // useEffect that handles localstorage if the user navigates away from the page or refreshes
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    // if a token is found -> Log the user in OTHERWISE make sure they are logged out
    if (token) {
      setCurrentUser(jwtDecode(token))
    } else {
      setCurrentUser(null)
    }
  }, [])
  
  return (
    <BrowserRouter>
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} currentUser={currentUser} />} />
        <Route path="/users/:id/" element={<GroceryList currentUser={currentUser} />} />
        <Route path="/signUp" element={<SignUp currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
