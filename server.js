var mysql = require('mysql');
var con = mysql.createConnection({
    host: "bb6ru2jjxfdxalpbj1rn-mysql.services.clever-cloud.com",
    user: "uta3yf4ke2zozg4a",
    password: "7px1uTtSoJlfYzTUj3Ch",
    database: "bb6ru2jjxfdxalpbj1rn"
  });
const express = require("express")
const app = express()
const PORT = process.env.PORT | 5000;
app.get("/PostData", (req, res)=>{

})

app.get("/", (req, res)=>{
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
      var sql = "DROP TABLE Participants;"
      //var sql = "CREATE TABLE Participants (email VARCHAR(255), password VARCHAR(50), leaderfirstname VARCHAR(50), leaderlastname VARCHAR(50), memberfirstname VARCHAR(50), memberlastname VARCHAR(50))";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
})
app.listen(PORT, ()=>{
    console.log("Server is listening....")
})