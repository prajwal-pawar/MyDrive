import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // using router for routing
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);
