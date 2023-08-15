import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import InputsValid from "../components/InputsValid";
import {
  faCheck,
  // faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LOGIN_URL = "/api/v1/auth/authenticate";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Authentication successful:", response?.data);

      setSuccess(true);
      setSuccessMsg("Login Successful")
      setErrMsg(false)
      // Handle successful login (e.g., store tokens, redirect, etc.)
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid credentials");
      } else {
        setSuccessMsg(false)
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <hr /><br />
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <InputsValid
              id="email"
              label="Email"
              icon={faCheck}
              type="text"
              valid={validEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              ariaInvalid={!validEmail}
              ariaDescribedBy="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="emailnote"
              className={
                emailFocus && !validEmail ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Please enter a valid email.
            </p>
        {/* Password */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Error message */}
        {errMsg && <p className="errmsg">{errMsg}</p>}
        {successMsg && <p className="successmsg">{successMsg}</p>}
        {/* Login button */}
        <button type="submit">Login</button>
      </form>
      <p>
            Haven't registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <Link to="/register">
                <div>Register</div>
              </Link>
              {/* <a href="#">Sign In</a> */}
            </span>
          </p>
    </section>
  );
};

export default Login;
