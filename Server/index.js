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

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    // console.log("Closed connection to MongoDB");
  }
}
run().catch(console.dir);
