const express = require("express");

const app = express();

const PORT = 8000;

// starting server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
