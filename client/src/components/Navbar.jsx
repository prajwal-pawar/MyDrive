import { Navbar as Navigation, Container, Nav } from "react-bootstrap";
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
    <Navigation bg="dark" data-bs-theme="dark">
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navigation.Brand>MyDrive</Navigation.Brand>
        </Link>

        {/* if user is authenticated */}
        {token ? (
          <Nav className="ms-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/user/files" className="nav-link">
              Your Files
            </Link>
            <button className="nav-link" onClick={logout}>
              Logout
            </button>
          </Nav>
        ) : (
          <Nav className="ms-auto">
            <Link to="/register" className="nav-link">
              Register
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </Nav>
        )}
      </Container>
    </Navigation>
  );
};
export default Navbar;
