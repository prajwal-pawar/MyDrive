import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, TextField, Button, Alert } from "@mui/material";
import axios from "axios";

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
  const registerUser = async () => {
    try {
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
    <div>
      <Grid
        container
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <h1 style={{ margin: "-100px 0px 10px 0px" }}>Register</h1>

        {/* notify as per API response */}
        {message ? (
          <Alert
            // if error is true set severity as error otherwise success
            severity={error ? "error" : "success"}
            style={{ margin: "20px 0px" }}
          >
            {message}
          </Alert>
        ) : null}

        <TextField
          type="text"
          label="Username"
          variant="outlined"
          inputRef={usernameRef} // same as ref={usernameRef}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          inputRef={passwordRef} // same as ref={passwordRef}
          style={{ marginBottom: "10px" }}
        />
        <Button
          variant="contained"
          onClick={registerUser}
          style={{ padding: "10px 20px" }}
        >
          Sign up
        </Button>
        <Link to="/login" style={{ marginTop: "20px" }}>
          Already have an account?
        </Link>
      </Grid>
    </div>
  );
};

export default Register;
