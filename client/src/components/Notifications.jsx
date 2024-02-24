import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

// MUI Toast notification
const Notifications = (props) => {
  // destructuring props
  const { error, message } = props;

  // hooks
  const [open, setOpen] = useState(false);

  // close notification
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // set open to true when there's a message to display
    if (message) {
      setOpen(true);
    }
  }, [message]);

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        // if error is true set severity as error otherwise success
        severity={error ? "error" : "success"}
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notifications;
