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
recordRoutes.route("https://tracker-rust-seven.vercel.app/projects/:user").get(function (req, res) {
  let db_connect = dbo.getDb("tracker");
  let query = {_id: req.params.user}
  console.log(query)
  db_connect
    .collection("projects")
    .findOne(query, (err, result) => {
      if(err) throw err
      res.json(result)
    })
    
});




// THESE TWO ARE THE SAME WILL REMOVE ONE 


// This gets document based on user so I can get indivdual project 
recordRoutes.route("/projects/:user/:projectName").get(function (req, res) {
  let db_connect = dbo.getDb();
  console.log(req.params.projectName)
  let myQuery = { _id: req.params.user };
  

  db_connect.collection("projects").findOne(myQuery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Create new project
recordRoutes.route("/projects/:user/add").post(function (req, response) {
  let db_connect = dbo.getDb();

  let newProject = {
    name: req.body.name,
    description: req.body.description,
    tasks: [],
  };
  
  let updateOperation = {
    $push: {
      projects: newProject
    }
  };

  db_connect.collection("projects").updateOne({_id: req.params.user }, updateOperation, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

//Goal of this is to add tasks to tasks array
recordRoutes.route("/projects/:user/:id").post(function (req, response) {
  const db_connect = dbo.getDb();
  const myQuery = { _id: req.params.user, "projects.name": req.params.id};
  const { description, tier } = req.body;
  console.log(req.params.id)
  let newValues = {
    $push: {
      "projects.$.tasks": {
        description,
        tier,
        seconds: 0,
      },
    },
  };

  //if sub task change position to under parent task
  if (tier) {
    newValues = {
      $push: {
        "projects.$.tasks": {
          $each: [
            {
              description,
              tier,
              seconds: 0,
            },
          ],
          $position: req.body.id,
        },
      },
    };
  }

  db_connect
    .collection("projects")
    .updateOne(myQuery, newValues, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

// Remove a task changing the record not deleting it
//doing this based on description, duplicate tasks should be allowed though
// will fix later
recordRoutes.route("/remove-task/:user/:id").post((req, response) => {
  console.log(req.body);

  let db_connect = dbo.getDb();

  let taskDescription = req.body.description;
  let projectName = req.params.id;

  let myQuery = { _id: req.params.user, "projects.name": projectName };

  console.log(`THIS IS TASK NAME:   ${taskDescription}`);
  let newValues = {
    $pull: {
      "projects.$.tasks": { description: taskDescription },
    },
  };

  db_connect
    .collection("projects")
    .updateOne(myQuery, newValues, function (err, res) {
      if (err) throw err;
      console.log("deleted 1 task");
      response.json(res);
    });
});

//edit task update it in db
//this will also not ignore duplicates
recordRoutes.route("/edit-task/:user/:id").post((req, response) => {
  let db_connect = dbo.getDb();
  console.log(req.body);

  let updatedDesc = req.body.updatedDescription;
  let oldDesc = req.body.oldDescription;

  console.log(updatedDesc, oldDesc);

  let projectName = req.params.id;

  let myQuery = {
    _id: req.params.user,
    "projects.name": projectName
  };

  let newValues = {
    $set: {
      "projects.$.tasks.$[task].description": updatedDesc
    },
  };

  let arrayFilters = [
    { "task.description": oldDesc }
  ];
  

  db_connect.collection("projects").updateOne(
    myQuery,
    newValues,
    { arrayFilters: arrayFilters },
    function (err, res) {
      if (err) throw err;
      console.log("updated 1 task");
      response.json(res);
    }
  );
});

//add time to task object
recordRoutes
  .route("/timer/:user/:projectName/task/:taskIndex")
  .post((req, response) => {
    let db_connect = dbo.getDb();

    let secondsElapsed = req.body.totalElapsedSeconds;
    console.log("seconds elapsed",secondsElapsed);

    let projectName = req.params.projectName;
    let index = parseInt(req.params.taskIndex);
    console.log("index",index);

    let myQuery = { _id: req.params.user, "projects.name": projectName };

    //increase by secondsElapsed

    let newValues = {
      $inc: {
        [`projects.$.tasks.${index}.seconds`]: parseInt(secondsElapsed),
        "projects.$.weekly": parseInt(secondsElapsed),
       "projects.$.daily": parseInt(secondsElapsed),
        "projects.$.total": parseInt(secondsElapsed),
      },
    };

    db_connect
      .collection("projects")
      .updateOne(myQuery, newValues, function (err, res) {
        if (err) throw err;
        console.log("updated 1 task");
        response.json(res);
      });
  });

recordRoutes.route("/:user/:projectName/set-current-task").post((req, response) => {
  let db_connect = dbo.getDb();

  let projectName = req.params.projectName;

  let myQuery = { _id: req.params.user, "projects.name": projectName };
  console.log("in current");
  let newValues = {
    $set: {
      "projects.$.currentTask": parseInt(req.body.index),
    },
  };

  db_connect
    .collection("projects")
    .updateOne(myQuery, newValues, function (err, res) {
      if (err) throw err;
      console.log("deleted 1 task");
      response.json(res);
    });
});

//create new user
recordRoutes.route("/add-user").post(async function (req, response) {
  let db_connect = dbo.getDb();
  let query = {_id: req.body.sub}
  let data = { _id: req.body.sub, projects: [] };

  //Check if user already exists

  const docExists = await db_connect.collection("projects").findOne(query);

  if (docExists) {
    console.log("document already exists");
    return;
  }

  db_connect.collection("projects").insertOne(data, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = recordRoutes;
