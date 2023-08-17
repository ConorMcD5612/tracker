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
recordRoutes.route("/projects/:user").get(function (req, res) {
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

// This gets document based on user so I can get project 
recordRoutes.route("/projects/:user/:projectName").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myQuery = { _id: req.params.user, "projects": {projectName: req.params.projectName} };
  

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
  const myQuery = { _id: req.params.user};
  const { description, tier } = req.body;
  console.log(req.params.id)
  let newValues = {
    $push: {
      "projects.tasks": {
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
        "projects.tasks": {
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
recordRoutes.route("/remove-task/:id").post((req, response) => {
  console.log(req.body);

  let db_connect = dbo.getDb();

  let taskDescription = req.body.description;
  let projectName = req.params.id;

  let myQuery = { name: projectName };
  console.log(`THIS IS TASK NAME:   ${taskDescription}`);
  let newValues = {
    $pull: {
      tasks: { description: taskDescription },
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
recordRoutes.route("/edit-task/:id").post((req, response) => {
  let db_connect = dbo.getDb();
  console.log(req.body);

  let updatedDesc = req.body.updatedDescription;
  let oldDesc = req.body.oldDescription;

  console.log(updatedDesc, oldDesc);

  let projectName = req.params.id;

  let myQuery = { name: projectName, "tasks.description": oldDesc };

  //right now is just deletes the task?
  //query is good
  let newValues = {
    $set: {
      "tasks.$.description": updatedDesc,
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

//edit time on task
recordRoutes
  .route("/timer/:projectName/task/:taskIndex")
  .post((req, response) => {
    let db_connect = dbo.getDb();

    let secondsElapsed = req.body.totalElapsedSeconds;
    console.log(secondsElapsed);

    let projectName = req.params.projectName;
    let index = parseInt(req.params.taskIndex);
    console.log(index);

    let myQuery = { name: projectName };

    //increase by secondsElapsed
  
    let newValues = {
      $inc: {
        [`tasks.${index}.seconds`]: parseInt(secondsElapsed),
        weekly: parseInt(secondsElapsed),
        daily: parseInt(secondsElapsed),
        total: parseInt(secondsElapsed)
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

// This section will help you delete a record // not using this rn
// recordRoutes.route("/:id").delete((req, response) => {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId(req.params.id) };
//   db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     response.json(obj);
//   });
// });

// recordRoutes.route("/:projectName/dates-for-seconds").get((req, res) => {
//   let currDate = new Date();
//   let projectName = req.params.projectName
//   let myQuery = {name: projectName, "tasks.secUpdated" }

//   db_connect.collection("projects")
//   .aggregate([
//     { $match: { name: projectName } }, // Match the specific project
//     {
//       $project: {
//         _id: 0, // Exclude the _id field from the output
//         secUpdated: "$tasks.secUpdated", // Extract the 'secUpdated' field from 'tasks'
//       },
//     },
//   ])
//   .then((result) => {
//     if (result.length === 0) {
//       return res.status(404).json({ message: "Project not found" });
//     }
//     const secUpdatedArray = result[0].secUpdated;
//     res.json(secUpdatedArray);
//   })
//   .catch((err) => {
//     console.error("Error retrieving project:", err);
//     res.status(500).json({ message: "Error retrieving project" });
//   });

// })


recordRoutes.route("/:projectName/set-current-task").post((req, response) => {
  

  let db_connect = dbo.getDb();

 
  let projectName = req.params.projectName;

  let myQuery = { name: projectName };
  console.log("in current")
  let newValues = {
    $set: {
      currentTask: parseInt(req.body.index)
    }
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
  let data = {_id: req.body.sub }

  //Check if user already exists
  const docExists = await db_connect.collection("projects").findOne(data)

  if(docExists){
    console.log("document already exists")
    return;
  }
  
  db_connect.collection("projects").updateOne(data, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});



module.exports = recordRoutes;
