import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Navbar from "./Navbar";
import UserFiles from "./UserFiles";

function App() {
  return (
    <div className="App">
      <Navbar />

      {/* routing */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/user/files" element={<UserFiles />} />
      </Routes>
    </div>
  );
}

export default App;
