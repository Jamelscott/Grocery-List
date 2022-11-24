import GroceryList from "./components/GroceryList/GroceryList";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";

import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/groceryList" element={<GroceryList />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
