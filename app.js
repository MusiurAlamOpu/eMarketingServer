const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const fileUpload = require('express-fileupload');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5055; //
const ObjectID = require("mongodb").ObjectID;
app.use(cors());
app.use(bodyParser.json());
// app.use(express.static('services'));
// app.use(fileUpload());

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.su3lx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const serviceCollection = client.db("eMarketing").collection("Services");//
  const reviewsCollection = client.db("eMarketing").collection("reviews");



  app.get("/", (req, res) => {
    res.send("Hi world!");
  });

  app.get("/addService", (req, res) => {
    serviceCollection.find().toArray((err, items) => {
      res.send(items);
      console.log(items);
    });
  });

  app.post("/addService", (req, res) => {
    const service = req.body;
    console.log("adding new Image", service);
    serviceCollection.insertOne(service).then((result) => {
      console.log("Inserted Count", result.insertedCount);
      res.send(result.insertedCount > 0);
    });
  });

  //review
  app.get("/addReview", (req, res) => {
    reviewsCollection.find().toArray((err, items) => {
      res.send(items);
      console.log(items);
    });
  });

  app.post("/addReview", (req, res) => {
    const review = req.body;
    console.log("adding new Image", review);
    reviewsCollection.insertOne(review).then((result) => {
      console.log("Inserted Count", result.insertedCount);
      res.send(result.insertedCount > 0);
    });
  });
//   client.close();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
