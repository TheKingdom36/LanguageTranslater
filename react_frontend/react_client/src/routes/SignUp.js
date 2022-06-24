import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { delay } from "../utils/Delay";
import AppWrapper from "../components/AppWrapper";
import "../css/LoginSignup.css";
import { signup } from "../apis/UserAPI";
export default function SignUp() {

  const navigate = useNavigate();

  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const [errorText, setErrorText] = useState("");

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setErrorText("Please ensure you have entered all values");
      setError(true);
      return;
    }

    try {
      await signup(name, email, password);
      setSubmitted(true);
      setError(false);

      delay(1000).then(() => navigate("/login"));
      
    } catch (err) {
      setErrorText("You were not successfully registered");
      setError(true);
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>{errorText}</h1>
      </div>
    );
  };

  return (
    <AppWrapper
      childern={
        <div className="signup">
          <div className="secondColor whiteBorder">
            <div className="form ">
              <div>
                <h1>Create an account</h1>
              </div>

              {/* Calling to the methods */}
              <div className="messages">
                {errorMessage()}
                {successMessage()}
              </div>

              <form className="fillWidth">
                {/* Labels and inputs for form data */}
                <label className="label">Name</label>
                <input
                  onChange={handleName}
                  className="input"
                  value={name}
                  type="text"
                />

                <label className="label">Email</label>
                <input
                  onChange={handleEmail}
                  className="input"
                  value={email}
                  type="email"
                />

                <label className="label">Password</label>
                <input
                  onChange={handlePassword}
                  className="input"
                  value={password}
                  type="password"
                />

                <button onClick={handleSubmit} className="submitBtn" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      }
    />
  );
}
