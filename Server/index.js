// Boiler Plate Code
const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Testing
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
