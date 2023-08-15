import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  // faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import InputsValid from "../components/InputsValid";
import { Link } from "react-router-dom";

const NAME_REGEX = /^[A-Z][A-Za-z-_]{1,23}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/;
const PHONE_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;
const PWD_REGEX = /^([A-Za-z0-9!@#$%^&*()_+={}[\]:;<>,.?~-]{4,24})$/;
const REGISTER_URL = "/api/v1/auth/register";

const Register = () => {
  //   const userRef = useRef();
  const errRef = useRef();

  //   const [user, setUser] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");

  const [validFName, setValidFName] = useState(false);
  const [validLName, setValidLName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidFName(NAME_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidLName(NAME_REGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, pwd, matchPwd]);

  const formatPhoneNumber = (input) => {
    const cleaned = ("" + input).replace(/\D/g, "");
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? "+1 " : "";
      return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
    return input;
  };

  useEffect(() => {
    if (phoneFocus) {
      // Only format the phone number if the input is in focus
      setPhone(formatPhoneNumber(phone));
    }
  }, [phone, phoneFocus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = NAME_REGEX.test(firstName);
    const v2 = NAME_REGEX.test(lastName);
    const v3 = PWD_REGEX.test(pwd);
    const v4 = PWD_REGEX.test(email);
    const v5 = PHONE_REGEX.test(phone);

    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password: pwd,
          retypedPassword: matchPwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <hr /><br />
          <form onSubmit={handleSubmit}>
            <div className="flex">
              {/* First Name */}
              <InputsValid
                id="fname"
                label="First Name"
                icon={faCheck}
                type="text"
                valid={validFName}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                ariaInvalid={!validFName}
                ariaDescribedBy="fnamenote"
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
              />

              {/* Last Name */}
              <InputsValid
                id="lname"
                label="Last Name"
                icon={faCheck}
                type="text"
                valid={validLName}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                ariaInvalid={!validFName}
                ariaDescribedBy="lnamenote"
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
              />
            </div>
            <p
              id="fnamenote"
              className={
                firstNameFocus && !validFName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              2 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, underscores, hyphens allowed.
              <br />
            </p>
            <p
              id="lnamenote"
              className={
                lastNameFocus && !validLName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              2 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, underscores, hyphens allowed.
              <br />
            </p>
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
            {/* Phone */}
            <InputsValid
              id="phone"
              label="Phone"
              icon={faCheck}
              type="text"
              valid={validPhone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              ariaInvalid={!validPhone}
              ariaDescribedBy="phonenote"
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
            />
            <p
              id="phonenote"
              className={
                phoneFocus && !validPhone ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Please enter a valid phone number.
            </p>

            {/* Password */}
            <InputsValid
              id="password"
              label="Password"
              icon={faCheck}
              type="password"
              valid={validPwd}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              ariaInvalid={!validPwd}
              ariaDescribedBy="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Can include uppercase and lowercase letters, numbers and special
              characters.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            {/* Confirm Password */}
            <InputsValid
              id="confirm_pwd"
              label="Confirm Password"
              icon={faCheck}
              type="password"
              valid={validMatch}
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              ariaInvalid={!validMatch}
              ariaDescribedBy="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button
              disabled={!validFName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <Link to="/">
                <div>Login</div>
              </Link>
              {/* <a href="#">Sign In</a> */}
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
