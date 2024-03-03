import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Box,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import download from "downloadjs";
import byteToSize from "../utils/byteToSize";
import isTokenExpired from "../utils/checkExpireToken";
import Notifications from "./Notifications";

const UserFiles = () => {
  // state hooks for error and success messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  // state hooks for setting user files
  const [files, setFiles] = useState([]);

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "20px 20px",
      }}
    >
      <Grid container display="flex" justifyContent="center">
        {/* if there is message, notify as per API response otherwise null */}
        {message ? <Notifications error={error} message={message} /> : null}
      </Grid>

      {/* map or search through user files */}
      {files.map((file, i) => (
        <Card
          sx={{
            margin: "20px",
            width: "300px",
            height: "250px",
            maxHeight: "250px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          key={i}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {file.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {file.type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {/* converting file size from KB to MB */}
              {byteToSize(file.size)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {/* {file.updatedAt} */}
              {moment(file.updatedAt).format("Do MMMM YYYY")}
            </Typography>
          </CardContent>

          <CardActions>
            <Button size="small" onClick={() => downloadUserFile(file)}>
              Download
            </Button>
            {/* <Button size="small" onClick={() => deleteUserFiles(file.name)}> */}
            <Button
              size="small"
              color="error"
              onClick={() => deleteUserFiles(file)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default UserFiles;
