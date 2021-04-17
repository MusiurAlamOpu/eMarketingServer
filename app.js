const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5055;
const ObjectID = require("mongodb").ObjectID;
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hi world!");
});

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.su3lx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const serviceCollection = client.db("eMarketing").collection("Services");//
  const reviewsCollection = client.db("eMarketing").collection("reviews");
  const bookingsCollection = client.db("eMarketing").collection("bookings");
  const adminsCollection = client.db("eMarketing").collection("admins");

  /////admins
  app.get("/addAdmin", (req, res) => {
    adminsCollection.find().toArray((err, items) => {
      res.send(items);
      console.log(items);
    });
  });
  
  app.post("/addAdmin", (req, res) => {
    const admin = req.body;
    console.log("adding new Image", admin);
    adminsCollection.insertOne(admin).then((result) => {
      console.log("Inserted Count", result.insertedCount);
      res.send(result.insertedCount > 0);
    });
  });

///bookings
app.get("/addBookings", (req, res) => {
  bookingsCollection.find().toArray((err, items) => {
    res.send(items);
    console.log(items);
  });
});

app.post("/addBookings", (req, res) => {
  const booking = req.body;
  console.log("adding new Image", booking);
  bookingsCollection.insertOne(booking).then((result) => {
    console.log("Inserted Count", result.insertedCount);
    res.send(result.insertedCount > 0);
  });
});
  
  ///services
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
  //deleteing services
  app.delete('/deleteService/:id', (req, res) => {
    const id = ObjectID(req.params.id);//
    console.log("delete:", id);
    serviceCollection.findOneAndDelete({_id: id})
    .then(documents => res.redirect(!!documents.value))
  })
  //deleting bookings
  app.delete('/deleteBooking/:id', (req, res) => {
    const id = ObjectID(req.params.id);//
    console.log("delete:", id);
    bookingsCollection.findOneAndDelete({_id: id})
    .then(documents => res.redirect(!!documents.value))
  })

  console.log("connected")
//   client.close();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
