import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import download from "downloadjs";
import byteToSize from "../utils/byteToSize";
import isTokenExpired from "../utils/checkExpireToken";
import Notifications from "./Notifications";
import Loader from "./Loader";

const UserFiles = () => {
  // state hooks for error and success messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  // state hooks for setting user files
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // get JWT/bearer token from localstorage
  const token = localStorage.getItem("token");

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

    // get user files
    getUserFiles();
  }, [token]);

  // get user files
  const getUserFiles = async () => {
    try {
      // set loading to true
      setLoading(true);

      // get response from server for getUserFiles API
      const response = await axios.get(
        "http://localhost:8000/getUserFiles",
        // sending headers to getUserFiles API
        {
          headers: {
            // sending authorization header to send JWT as bearer token to authorize getUserFiles request
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response);

      // set files after response
      setFiles(response.data.files);

      // send message as per API response to notify user
      setMessage(response.data.message);
      // set error as false
      setError(false);

      // set loading to false
      setLoading(false);
    } catch (err) {
      console.log(err);

      // set error as true
      setError(true);
      // send message as per API response to notify user
      setMessage(err.response.data.message);
    }
  };

  // delete user files
  const deleteUserFiles = async (file) => {
    let filename = file.name;

    try {
      // get response from server for deleteUserFiles API
      const response = await axios.post(
        "http://localhost:8000/deleteUserFiles",
        {
          filename,
        },
        // sending headers to deleteUserFiles API
        {
          headers: {
            // sending authorization header to send JWT as bearer token to authorize deleteUserFiles request
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      // remove the deleted file from file state
      setFiles(files.filter((file) => file.name !== filename));

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

  // download user files
  const downloadUserFile = async (file) => {
    try {
      let fileId = file._id;
      let filePath = file.path;
      let fileType = file.type;
      let fileName = file.name;

      // get response from server for downloadUserFile API
      const response = await axios.get(
        `http://localhost:8000/downloadUserFile/${fileId}`,
        // sending headers to downloadUserFile API
        {
          // necessary for downloading a file
          responseType: "blob",
          headers: {
            // sending authorization header to send JWT as bearer token to authorize downloadUserFile request
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("res", response.data);

      return download(response.data, fileName, fileType);
    } catch (err) {
      console.log(err);

      // set error as true
      setError(true);
      // send message as per API response to notify user
      setMessage(err.response.data.message);
    }
  };

  // if loading, return Loader
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container d-flex align-items-center justify-content-center flex-wrap">
      {/* if there is message, notify as per API response otherwise null */}
      {message ? <Notifications error={error} message={message} /> : null}

      {/* if user has no uploaded files */}
      {files.length == 0 && (
        <h5 className="mt-5">
          You have no files in your drive, <Link to="/">Upload here</Link>
        </h5>
      )}

      {/* if user has uploaded files */}
      {files.map((file, i) => (
        <Card key={i} className="me-4 w-25 mt-4" style={{ height: "220px" }}>
          <Card.Body>
            <Card.Title
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {file.name}
            </Card.Title>
            <Card.Text>
              {/* file type */}
              {file.type} <br />
              {/* converting file size from KB to MB */}
              {byteToSize(file.size)} <br />
              {/* date */}
              {moment(file.updatedAt).format("Do MMMM YYYY")}
            </Card.Text>
          </Card.Body>

          <Card.Footer className="d-flex justify-content-between align-items-center">
            <Button
              variant="primary"
              onClick={() => downloadUserFile(file)}
              className="me-4 mt-auto"
            >
              Download
            </Button>
            <Button variant="danger" onClick={() => deleteUserFiles(file)}>
              Delete
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};

export default UserFiles;
