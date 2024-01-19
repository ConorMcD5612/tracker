
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
//hello dood
app.use(cors(
  {
    origin: ["https://tracker-5ejy.vercel.app", "localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
  }
));

app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

app.get("/", (req, res) => {
  res.json("WORK")
})

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});


