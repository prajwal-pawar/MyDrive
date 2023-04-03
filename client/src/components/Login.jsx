import { Link } from "react-router-dom";
import { Grid, TextField, Button } from "@mui/material";

const Login = () => {
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

        <TextField
          type="text"
          id="outlined-basic"
          label="Username"
          variant="outlined"
          style={{ marginBottom: "10px" }}
        />
        <TextField
          type="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          style={{ marginBottom: "10px" }}
        />

        <Button variant="contained" style={{ padding: "10px 20px" }}>
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
