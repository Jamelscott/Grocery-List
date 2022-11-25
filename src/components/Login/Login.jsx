import { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
function Login() {
  const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: "",
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
        className="list-container"
      >
        <p className="loginText">Login</p>
        <form
          style={{
            marginBottom: "0",
            display: "flex",
            flexFlow: "wrap",
            flexDirection: "column",
            height: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="list-form"
        >
          <input
            className="login-input-field"
            type="text"
            placeholder="Username.."
            value={loginCreds.name}
            onChange={(e) =>
              setLoginCreds({ ...loginCreds, username: e.target.value })
            }
          />
          <input
            className="login-input-field"
            type="password"
            placeholder="Password.."
            value={loginCreds.password}
            onChange={(e) =>
              setLoginCreds({ ...loginCreds, password: e.target.value })
            }
          />
          <input className="login-submit-button" type="submit" value="Submit" />
        </form>
        <hr className="whiteLine"></hr>
        <p className="questionText">
          don’t have an account? <br></br> Sign up <span> </span>
          <Link className="link" to="/signUp">
            here
          </Link>
        </p>
      </div>
      <div>
        <Link to="/groceryList">GroceryList</Link>
      </div>
    </>
  );
}

export default Login;
