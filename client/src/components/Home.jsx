import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Alert,
  Divider,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Box,
} from "@mui/material";
import axios from "axios";

const Home = () => {
  // state hooks for error and success messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  // state hooks for setting user files
  const [files, setFiles] = useState([]);

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

    // get user files
    getUserFiles();
  }, [token]);

  // function to format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

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

      console.log(response.data);

      // update user files to include the newly added files
      setFiles((prevFiles) => [...prevFiles, response.data.file]);

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
  const downloadUserFile = async (fileId) => {
    try {
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

      // creating object URL from response data
      // const blob = new Blob([response.data]);
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("download", fileId);
      document.body.appendChild(link);
      link.click();

      // cleanup
      window.URL.revokeObjectURL(url);
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
      </div>

      <Divider />

      {/* show user files */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          margin: "20px 20px",
        }}
      >
        {/* map or search through user files */}
        {files.map((file, i) => (
          <Card sx={{ margin: "20px", width: "300px" }} key={i}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {file.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {file.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {/* {file.size} */}
                {/* converting file size from KB to MB */}
                {parseFloat(file.size / 1024 / 1024).toFixed(3) + " MB"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {/* {file.updatedAt} */}
                {formatDate(file.updatedAt)}
              </Typography>
            </CardContent>

            <CardActions>
              <Button size="small" onClick={() => downloadUserFile(file._id)}>
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
    </div>
  );
};

export default Home;

// https://blog.yogeshchavan.dev/build-an-app-with-file-upload-and-download-functionality-and-image-preview-using-mern-stack
