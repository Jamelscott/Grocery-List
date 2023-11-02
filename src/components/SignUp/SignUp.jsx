import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
function SignUp({setCurrentUser,  currentUser}) {
  const [signUpCreds, setSignUpCreds] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSignUpSubmit = async (e) => {
    setError("");
    e.preventDefault();
    if (!signUpCreds.username || signUpCreds.username.split("").length < 4) {
      setError("invalid username, must be more then 3 characters");
      return
    }
    if (!signUpCreds.email || signUpCreds.email.split("@")[0].length < 4) {
      setError("invalid email");
      return
    }
    if (signUpCreds.password.length < 5) {
      setError("invalid password, must be at least 5 characeters");
      return
    }
    if (signUpCreds.password !== signUpCreds.confirmPassword) {
      setError("passwords do not match");
      return
    }
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/register`, {
        name: signUpCreds.username,
        email: signUpCreds.email,
        password: signUpCreds.password
      })

      console.log(data)
      // decode the token that is sent to use
      const { token } = data;
      const decoded = jwtDecode(token);
      // save the token in the localStorage
      localStorage.setItem('jwt', token);
      // set the state to the logged in user
      setCurrentUser(decoded);
    } catch(err) {
      console.log(err)
      setError(err.response.data.msg)
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
        <p className="loginText">Sign up</p>
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
          onSubmit={handleSignUpSubmit}
        >
          <input
            className="login-input-field"
            type="text"
            placeholder="enter username.."
            value={signUpCreds.name}
            onChange={(e) =>
              setSignUpCreds({ ...signUpCreds, username: e.target.value })
            }
          />
          <input
            className="login-input-field"
            type="email"
            placeholder="enter email.."
            value={signUpCreds.email}
            onChange={(e) =>
              setSignUpCreds({ ...signUpCreds, email: e.target.value })
            }
          />
          <input
            className="login-input-field"
            type="password"
            placeholder="enter password.."
            value={signUpCreds.password}
            onChange={(e) =>
              setSignUpCreds({ ...signUpCreds, password: e.target.value })
            }
          />
          <input
            className="login-input-field"
            type="password"
            placeholder="confirm password.."
            value={signUpCreds.confirmPassword}
            onChange={(e) =>
              setSignUpCreds({
                ...signUpCreds,
                confirmPassword: e.target.value,
              })
            }
          />
          <input className="login-submit-button" type="submit" value="Submit" />
        </form>
        <hr className="whiteLine"></hr>
        <p className="questionText">
          already have an account? <br></br> Login <span> </span>
          <Link className="link" to="/login">
            here
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
