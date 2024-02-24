import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  // get JWT/bearer token from localstorage
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    // window.location.reload();
    return navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* left side */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyDrive
        </Typography>

        {/* right side */}
        {token ? (
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button color="inherit">
                <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                  Home
                </Link>
              </Button>
            </Grid>
            <Grid item>
              <Button color="inherit">
                <Link
                  to="/user/files"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Files
                </Link>
              </Button>
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button color="inherit">
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Register
                </Link>
              </Button>
            </Grid>
            <Grid item>
              <Button color="inherit">
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Login
                </Link>
              </Button>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
