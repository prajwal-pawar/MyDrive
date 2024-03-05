import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, ProgressBar } from "react-bootstrap";
import axios from "axios";
import Notifications from "./Notifications";
import isTokenExpired from "../utils/checkExpireToken";

const Home = () => {
  // state hooks for error and success messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

    // if token is expired, delete token
    if (isTokenExpired) {
      localStorage.removeItem("token");
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
          // tracks file upload progress
          onUploadProgress: (progressEvent) => {
            // calculate the upload progress
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );

            setUploadProgress(progress);
          },
        }
      );

      console.log(response.data);

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
    <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
      <h1 className="mb-4">MyDrive</h1>

      {/* if there is message, notify as per API response otherwise null */}
      {message ? <Notifications error={error} message={message} /> : null}

      <Form.Group controlId="formFile" className="mb-3 mt-2 w-50">
        <Form.Label>Choose File to Upload</Form.Label>
        <Form.Control
          type="file"
          ref={fileRef}
          // onChange={uploadFiles} // on changing file
        />
      </Form.Group>

      <Button variant="primary" onClick={uploadFiles}>
        Upload
      </Button>

      <div className="mt-5 w-50">
        {/* render progress bar only when there is progress */}
        {uploadProgress > 0 && (
          <ProgressBar
            animated
            now={uploadProgress}
            label={`${uploadProgress} %`}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
