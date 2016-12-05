var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var SENSOR_DATA_COLLECTION = "sensorData";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var db;

mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
  if(err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log("Database connection ready");

  var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// app.get("/sensorData", function(req, res) {
//
// });

app.use("/", routes);

app.post("/sensorData", function(req, res) {
  var newData = req.body;
  newData.createDate = new Date();

app.get("/resultCharts", function(req, res, next) {
  res.render("/index.html")
})

  // if(!(req.body.firstName || req.body.lastName)) {
  //   handleError(res, "Invalid user input", "Must provide a first or last name", 400);
  //   return;
  // }

  db.collection(SENSOR_DATA_COLLECTION).insertOne(newData, function(err, doc) {
    if(err) {
      handleError(res, err.message, "Failed to create new data points.");
      return;
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

app.get("/sensorData/:id", function(req, res) {

})
