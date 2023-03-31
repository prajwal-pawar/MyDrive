const express = require("express");
const db = require("./configs/mongoose");

const app = express();

const PORT = 8000;

// body parsers : to understand req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes
app.use("/", require("./routes"));

// starting server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
