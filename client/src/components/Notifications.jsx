import { useState, useEffect } from "react";
import { ToastContainer, Toast } from "react-bootstrap";

// Toast notification
const Notifications = (props) => {
  // destructuring props
  const { error, message } = props;

  const [show, setShow] = useState(false);

  // When message changes, show the Toast
  useEffect(() => {
    if (message) {
      setShow(true);
    }
  }, [message]);

  return (
    <ToastContainer className="p-3" position="top-center" style={{ zIndex: 1 }}>
      <Toast
        className="d-inline-block m-1"
        bg={error ? "danger" : "success"}
        show={show}
        onClose={() => setShow(false)}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">{error ? "Error" : "Success"}</strong>
          <small>MyDrive</small>
        </Toast.Header>
        <Toast.Body className="Dark && text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Notifications;
