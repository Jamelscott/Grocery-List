import { Link } from "react-router-dom";
import { useState } from "react";
function SignUp() {
  const [loginCreds, setLoginCreds] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        <p className="loginText">Sign up</p>
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
            placeholder="enter username.."
            value={loginCreds.name}
            onChange={(e) =>
              setLoginCreds({ ...loginCreds, username: e.target.value })
            }
          />
          <input
            className="login-input-field"
            type="email"
            placeholder="enter email.."
            value={loginCreds.email}
            onChange={(e) =>
              setLoginCreds({ ...loginCreds, email: e.target.value })
            }
          />
          <input
            className="login-input-field"
            type="password"
            placeholder="enter password.."
            value={loginCreds.password}
            onChange={(e) =>
              setLoginCreds({ ...loginCreds, password: e.target.value })
            }
          />
          <input
            className="login-input-field"
            type="password"
            placeholder="confirm password.."
            value={loginCreds.confirmPassword}
            onChange={(e) =>
              setLoginCreds({ ...loginCreds, confirmPassword: e.target.value })
            }
          />
          <input className="login-submit-button" type="submit" value="Submit" />
        </form>
        <hr className="whiteLine"></hr>
        <p className="questionText">
          already have an account? <br></br> Login <span> </span>
          <Link className="link" to="/">
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
