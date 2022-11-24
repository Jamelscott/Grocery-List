import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <p>Login Page</p>
      <div>
        <Link to="/SignUp">Sign up</Link>
      </div>
      <div>
        <Link to="/groceryList">GroceryList</Link>
      </div>
    </div>
  );
}

export default Login;
