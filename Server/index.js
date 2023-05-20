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

// function has been marked async because we are using await (connction with server takes time)
app.post("/addEvent", async (req, res) => {
  const event = req.body;
  // console.log(event);
  await client.connect();
  const db = client.db("event_calender");
  const collection = db.collection("events");

  try {
    await collection.insertOne(event);
    console.log("Event Added");
    res.send({ message: "Event Added" });
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

app.get("/events/:month/:year", async (req, res) => {
  // get month and year from the incoming payload
  const month = parseInt(req.params.month);
  const year = parseInt(req.params.year);
  console.log(month, year);
  await client.connect();
  const db = client.db("event_calender");
  const collection = db.collection("events");

  await collection
    .find({ month: month, year: year })
    .toArray()
    .then((result) => {
      console.log(result);
      res.send(result);
    });

  console.log("Events Fetched");
});
