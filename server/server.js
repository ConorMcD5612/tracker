// const express = require("express");
// const app = express();
// const cors = require("cors")
// require("dotenv").config({path: "./env"});
// const port = process.env.PORT || 5000;
// // dont think I need cors what cors does is allow you to get information from other API endpoints than the one on your server I believe

// app.use(cors())
// app.use(express.json())
// app.use(require("./routes/records"))

// //driver connection?
// const dbo = require("./db/conn");

// app.listen(port, () => {
//     dbo.connectToServer(function (err) {
//         if(err) console.err(err)
//     });

//     console.log(`Server is running on ${port}`)
// })
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
//breh
// Accessing the path module
// const path = require("path");

// // Step 1:
// app.use(express.static(path.resolve(__dirname, "./build")));
// // Step 2:
// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "./build", "index.html"));
// });

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});


