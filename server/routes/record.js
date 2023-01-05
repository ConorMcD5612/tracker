const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// Get all projects 
recordRoutes.route("/projects").get(function (req, res) {
  let db_connect = dbo.getDb("tracker");
  db_connect
    .collection("projects")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This gets document based on id so I can get task array 
recordRoutes.route("/projects/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { name: req.params.id };

  db_connect
    .collection("projects")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});


// Create new project 
recordRoutes.route("/projects/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    tasks: [],
    name: req.body.name,
    hours: req.body.hours,
  };
  db_connect.collection("projects").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

//Goal of this is to add tasks to tasks array
recordRoutes.route("/projects/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { name: req.params.id };

  let newValues = {
    $push: {
      "tasks": { description: req.body.description, tier: req.body.tier }
    }
  };

  if (req.body.prevTaskIndex) {
    console.log(req.body.prevTaskIndex)
    newValues = {
      $push: {
        "tasks": {
          $each: [{
            description: req.body.description,
            tier: req.body.tier
          }],
          $position: req.body.prevTaskIndex + 1
        }
      }
    };
  }

  console.log(newValues)
  db_connect
    .collection("projects")
    .updateOne(myquery, newValues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// Remove a task changing the record not deleting it 
recordRoutes.route("/projects/:id").delete((req, res) => {
  console.log("MADE IT HERE BROTHA ")
  console.log(req.params.id)
  console.log(typeof req.params)
  let db_connect = dbo.getDb();

  let taskName = req.body.name
  let projectName = req.params.id

  let myQuery = { name: projectName }
  console.log(`THIS IS TASK NAME:   ${taskName}`)
  let newValues = {
    $pull: {
      tasks: { $in: [taskName] }
    }
  }

  db_connect
  .collection("projects")
  .updateOne(myQuery, newValues, function (err, res) {
    if (err) throw err;
    console.log("deleted 1 task")
    response.json(res)
  })

})

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;