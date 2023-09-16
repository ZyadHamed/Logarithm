var mysql = require('mysql');
var con = mysql.createConnection({
    host: "bb6ru2jjxfdxalpbj1rn-mysql.services.clever-cloud.com",
    user: "uta3yf4ke2zozg4a",
    password: "7px1uTtSoJlfYzTUj3Ch",
    database: "bb6ru2jjxfdxalpbj1rn"
  });
const express = require("express");
const app = express();
const PORT = process.env.PORT | 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json())
app.post("/SignUp", (req, res)=>{
  teamname = req.body["teamname"];
  email = req.body["email"];
  password = req.body["password"];
  leaderfirstname = req.body["leaderfirstname"];
  leaderlastname = req.body["leaderlastname"];
  membertwofirstname = req.body["membertwofirstname"];
  membertwolastname = req.body["membertwolastname"];
  var sql = "INSERT INTO Participants (teamname, email, password, leaderfirstname, leaderlastname, memberfirstname, memberlastname) VALUES ('" + teamname + "', '" + email + "', '" + password + "', '" + leaderfirstname + "', '" + leaderlastname + "', '" + membertwofirstname + "', '" + membertwolastname + "');";
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
});

app.get("/", (req, res)=>{
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
      res.send({msg:"It's working charms!!!"});
});
app.listen(PORT, ()=>{
    console.log("Server is listening on port " + PORT);
});