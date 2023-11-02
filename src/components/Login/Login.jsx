import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../../App.css";
import axios from 'axios'
import { jwtDecode } from "jwt-decode";

function Login( { setCurrentUser, currentUser } ) {
  const [loginCreds, setLoginCreds] = useState({
    name: "",
    password: "",
  });
  const [msg, setMsg] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("")
    if (!loginCreds.name || !loginCreds.password) {
      return setMsg("missing login credentials");
    }
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, loginCreds)
      // decode the token that is sent to use
      const { token } = data;
      const decoded = jwtDecode(token);
      // save the token in the localStorage
      localStorage.setItem('jwt', token);
      // set the state to the logged in user
      setCurrentUser(decoded);
    } catch(err) {
      console.log(err)
      setMsg(err.response.data.msg)
    }
  };
  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;
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
        {msg ? <p className="loginErrorText">{msg}</p> : <></>}
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
              setLoginCreds({ ...loginCreds, name: e.target.value })
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
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          color: 'white'
        }}
        className="list-container"
      >
        <h4 className="loginText" style={{marginTop:0, marginBottom:0}}>Just visiting?</h4>
        <hr className="whiteLine"></hr>
        <p className="questionText">username: visitor </p>
        <p className="questionText">password: visitor </p>
      </div>
    </>
  );
}

export default Login;
