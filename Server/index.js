// Boiler Plate Code
const { MongoClient, ServerApiVersion } = require("mongodb");
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

// ATLAS CONNECTION BOILER PLATE CODE
const uri =
  "mongodb+srv://admin:admin123@firstcluster.bf7dthu.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// adding event function
async function addEvent(event) {
  try {
    await client.connect();
    const db = client.db("event_calender");
    const collection = db.collection("events");
    const insertEvent = await collection.insertOne(event);
  } catch (err) {
    console.log(err);
  }
}

// app.post("/addEvent", (req, res) => {
//   const event = req.body;
//   console.log(event);
//   try {
//     addEvent(event);
//     res.send("Event added");
//   } catch (err) {
//     res.send(err);
//     console.log(err);
//   }
// });
