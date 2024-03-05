import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Notifications from "./Notifications";

const Login = () => {
  // states for error and success messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  // ref's for getting input
  const usernameRef = useRef();
  const passwordRef = useRef();

  // to redirect user
  const navigate = useNavigate();

  // login user
  const loginUser = async (event) => {
    try {
      // prevent default behaviour of form submit
      event.preventDefault();

      // getting input values
      let username = usernameRef.current.value;
      let password = passwordRef.current.value;

      // get response from server for login API
      const response = await axios.post("http://localhost:8000/signIn", {
        username,
        password,
      });

      console.log(response);

      // save JWT/bearer token in localstorage to persistent user session
      localStorage.setItem("token", response.data.token);

      // send message as per API response to notify user
      setMessage(response.data.message);
      // set error as false
      setError(false);

      // redirect to login page
      navigate("/");
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
      <h1 className="mb-4">Login</h1>

      {/* if there is message, notify as per API response otherwise null */}
      {message ? <Notifications error={error} message={message} /> : null}

      <Form onSubmit={loginUser} className="w-50">
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
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>

      <Link to="/register" className="mt-5">
        Don't have an account?
      </Link>
    </div>
  );
};

export default Login;
