import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Alert, Divider, Grid } from "@mui/material";
import axios from "axios";

const Home = () => {
  // states for error and success messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  // get JWT/bearer token from localstorage
  const token = localStorage.getItem("token");
  // to redirect user
  const navigate = useNavigate();
  // ref's for getting file input
  const fileRef = useRef();

  useEffect(() => {
    // if token doesnt exists, return to login
    if (!token) {
      return navigate("/login");
    }
  }, [token]);

  // upload files
  const uploadFiles = async () => {
    try {
      // getting file
      let file = fileRef.current.files[0];

      console.log("file is : ", file);
      console.log("file name is : ", file.name);
      console.log("file size is : ", file.size);
      console.log("file type is : ", file.type);

      // get response from server for file upload API
      const response = await axios.post(
        "http://localhost:8000/upload",
        {
          file,
        },
        // sending headers to upload API
        {
          headers: {
            // sending Content-Type header because we are sending file data
            "Content-Type": "multipart/form-data",
            // sending authorization header to send JWT as bearer token to authorize file upload request
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      <h1 style={{ textAlign: "center", margin: "20px 0px" }}>MyDrive</h1>

      <Grid container display="flex" justifyContent="center">
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
      </Grid>

      <div style={{ textAlign: "center" }}>
        <label htmlFor="uploadBtn">
          <input
            type="file"
            id="uploadBtn"
            style={{ display: "none" }}
            ref={fileRef}
            onChange={uploadFiles} // on changing file
          />
          <Button
            color="primary"
            variant="contained"
            component="span"
            style={{ marginBottom: "20px" }}
          >
            Upload Files
          </Button>
        </label>

        <Divider />
      </div>
    </div>
  );
};

export default Home;
