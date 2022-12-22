// //connection
// const { MongoClient } = require("mongodb")
// const db = process.env.MONGO_DATABASE;

// const client = new MongoClient(db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// let _db;

// module.exports = {
//     connectToServer: function (callback) {
//         client.connect(function (err, db){
//             if(db)
//             {
//                 _db = db.db("tasks")
//                 console.log("connected to mongoDB")
//             }
//             return callback(err)
//         })
//     },

//     getDb: function() {
//         return _db;
//     },
// }

const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,   
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("tracker");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};