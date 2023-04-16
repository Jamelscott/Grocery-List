import { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { loginClientErrors } from "./login_helper";
function Login() {
  const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    setError("");
    e.preventDefault();
    setError(loginClientErrors(loginCreds));
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
        className="list-container"
      >
        <p className="loginText">Login</p>

        {error ? <p className="errorText">{error}</p> : <></>}
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
          onSubmit={handleLogin}
        >
          <input
            className="login-input-field"
            type="text"
            placeholder="username.."
            value={loginCreds.name}
            onChange={(e) =>
              setLoginCreds({ ...loginCreds, username: e.target.value })
            }
          />
          <input
            className="login-input-field"
            type="password"
            placeholder="password.."
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
