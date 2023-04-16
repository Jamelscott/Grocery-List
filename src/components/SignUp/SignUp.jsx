import { Link } from "react-router-dom";
import { useState } from "react";
import { signupErrors } from "./signUp_helper.js";
function SignUp() {
  const [signUpCreds, setSignUpCreds] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSignUpSubmit = (e) => {
    setError("");
    e.preventDefault();
    setError(signupErrors(signUpCreds));
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
      <div>
        <Link to="/groceryList">GroceryList</Link>
      </div>
    </>
  );
}

export default SignUp;
