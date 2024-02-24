import { jwtDecode } from "jwt-decode";

const checkExpireToken = () => {
  // get JWT/bearer token from localstorage
  const token = localStorage.getItem("token");

  // decode jwt
  const decoded = token ? jwtDecode(token) : null;

  // check if jwt token is expired
  if (decoded && Date.now() >= decoded.exp * 1000) {
    return true;
  }

  return false;
};

const isTokenExpired = checkExpireToken();

export default isTokenExpired;
