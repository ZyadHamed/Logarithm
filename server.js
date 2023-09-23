var mysql = require('mysql');
const path = require("path");
const util = require("util")
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
app.use(express.json());
app.use('/', express.static(path.join(__dirname + '/')));
const queryAsync = util.promisify(con.query).bind(con);
app.post("/SignUp", async (req, res)=>{
  teamname = req.body["teamname"];
  email = req.body["email"];
  password = req.body["password"];
  leaderfirstname = req.body["leaderfirstname"];
  leaderlastname = req.body["leaderlastname"];
  membertwofirstname = req.body["membertwofirstname"];
  membertwolastname = req.body["membertwolastname"];
  var checkQuery1 = "SELECT * from Participants WHERE teamname='" + teamname + "';";
  var checkQuery2 = "SELECT * from Participants WHERE email='" + email + "';";
  var sql = "INSERT INTO Participants (teamname, email, password, leaderfirstname, leaderlastname, memberfirstname, memberlastname) VALUES ('" + teamname + "', '" + email + "', '" + password + "', '" + leaderfirstname + "', '" + leaderlastname + "', '" + membertwofirstname + "', '" + membertwolastname + "');";
  const result1 = await queryAsync(checkQuery1);
  if(result1.length > 0){
    return res.send({err: "This Team Name Already Exists"});
  }
  const result2 = await queryAsync(checkQuery2);
  if(result2.length > 0){
    return res.send({err: "This Email Already Exists"});
  }
  await queryAsync(sql);
  res.send({success:"Account Created Successfully!"});
});

app.post("/Login", async (req, res)=>{
  email = req.body["email"];
  password = req.body["password"];
  var checkQuery = "SELECT * from Participants WHERE email='" + email + "' AND password='" + password + "';";
  const result = await queryAsync(checkQuery);
  if(result.length > 0)
  {
    res.send({success: "Account was found!", teamname: result[0].teamname})
  }
  else
  {
    res.send({err: "No account with such credientals was found!"})
  }
});

app.post("/InitCompetition", async (req, res)=>{
  teamname = req.body["teamname"];
  var checkQuery = "SELECT * from Grades WHERE teamname='" + teamname + "';";
  const result = await queryAsync(checkQuery);
  if(result.length > 0)
  {
    if(result[0].totalscore == undefined){
      res.send({ts: result[0].timestamp});
    }
    else
    {
      res.send({err: "This account has already finished the competition!"});
    }
  }
  else
  {
    var timestamp = Date.now();
    var query = "INSERT INTO Grades (teamname, timestamp) VALUES ('" + teamname + "', '" + timestamp + "');";
    await queryAsync(query);
    res.send({ts: timestamp});
  }
  
});

app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/signup.html");
});



app.listen(PORT, ()=>{
    console.log("Server is listening on port " + PORT);
});