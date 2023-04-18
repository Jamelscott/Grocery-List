import GroceryList from "./components/GroceryList/GroceryList";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import {io} from 'socket.io-client'
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
const socket = io('http://localhost:3001')
socket.on('connect', ()=>{
  console.log(`you connected with id: ${socket.id}`)
})

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/groceryList" element={<GroceryList />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
