import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, Button, Alert } from "@mui/material";
import axios from "axios";

const Login = () => {
  // states for error and success messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  // ref's for getting input
  const usernameRef = useRef();
  const passwordRef = useRef();

  // login user
  const loginUser = async () => {
    try {
      // getting input values
      let username = usernameRef.current.value;
      let password = passwordRef.current.value;

      // get response from server for login API
      const response = await axios.post("http://localhost:8000/signIn", {
        username,
        password,
      });

      console.log(response);

      // send message as per API response to notify user
      setMessage(response.data.message);
      // set error as false
      setError(false);
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
        <h1 style={{ margin: "-100px 0px 10px 0px" }}>Login</h1>

        {/* if there is message, notify as per API response otherwise null */}
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
          id="outlined-basic"
          label="Username"
          variant="outlined"
          inputRef={usernameRef} // same as ref={usernameRef}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          type="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          inputRef={passwordRef} // same as ref={passwordRef}
          style={{ marginBottom: "10px" }}
        />

        <Button
          variant="contained"
          onClick={loginUser}
          style={{ padding: "10px 20px" }}
        >
          Sign in
        </Button>

        <Link to="/register" style={{ marginTop: "20px" }}>
          Don't have an account?
        </Link>
      </Grid>
    </div>
  );
};

export default Login;
