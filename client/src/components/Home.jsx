import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // get JWT/bearer token from localstorage
  const token = localStorage.getItem("token");
  // to redirect user
  const navigate = useNavigate();

  useEffect(() => {
    // if token doesnt exists, return to login
    if (!token) {
      return navigate("/login");
    }
  }, [token]);

  return (
    <div>
      <h1>HELLO</h1>
    </div>
  );
};

export default Home;
