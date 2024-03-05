import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Notifications from "./Notifications";

const Register = () => {
  // states for error and success messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  // ref's for getting input
  const usernameRef = useRef();
  const passwordRef = useRef();

  // to redirect user
  const navigate = useNavigate();

  // register user
  const registerUser = async (event) => {
    try {
      // prevent default behaviour of form submit
      event.preventDefault();

      // getting input values
      let username = usernameRef.current.value;
      let password = passwordRef.current.value;

      // get response from server for register API
      const response = await axios.post("http://localhost:8000/signUp", {
        username,
        password,
      });

      console.log(response);

      // send message as per API response to notify user
      setMessage(response.data.message);
      // set error as false
      setError(false);

      // redirect to login page
      navigate("/login");
    } catch (err) {
      console.log(err);

      // set error as true
      setError(true);
      // send message as per API response to notify user
      setMessage(err.response.data.message);
    }
  };

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <h1 className="mb-4">Register</h1>

      {/* if there is message, notify as per API response otherwise null */}
      {message ? <Notifications error={error} message={message} /> : null}

      <Form onSubmit={registerUser} className="w-50">
        <Form.Group className="mb-3" controlId="formUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            ref={usernameRef}
            placeholder="Enter Username"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            ref={passwordRef}
            placeholder="Password"
            required
          />
          <Form.Text className="text-muted">Enter a strong password</Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign up
        </Button>
      </Form>

      <Link to="/login" className="mt-5">
        Already have an account?
      </Link>
    </div>
  );
};

export default Register;
