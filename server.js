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

app.post("/SubmitAnswers", async (req, res)=>{
  var q1ans, q2ans, q3ans, q4ans, q5ans, q6ans, q7ans, q8ans, q9ans, q10ans, q11ans, q12ans, q13ans, q14ans, q15ans, q16ans, q17ans, q18ans, q19ans, q20ans = 0;
  teamname = req.body["teamname"];
  q1ans = req.body["q1ans"];
  q2ans = req.body["q2ans"];
  q3ans = req.body["q3ans"];
  q4ans = req.body["q4ans"];
  q5ans = req.body["q5ans"];
  q6ans = req.body["q6ans"];
  q7ans = req.body["q7ans"];
  q8ans = req.body["q8ans"];
  q9ans = req.body["q9ans"];
  q10ans = req.body["q10ans"];
  q11ans = req.body["q11ans"];
  q12ans = req.body["q12ans"];
  q13ans = req.body["q13ans"];
  q14ans = req.body["q14ans"];
  q15ans = req.body["q15ans"];
  q16ans = req.body["q16ans"];
  q17ans = req.body["q17ans"];
  q18ans = req.body["q18ans"];
  q19ans = req.body["q19ans"];
  q20ans = req.body["q20ans"];

  var totalScore = 0;
  if(q1ans == 0)
  {
    totalScore += 3;
  }
  if(q2ans == 503)
  {
    totalScore += 3;
  }
  if(q3ans == 511)
  {
    totalScore += 3;
  }
  if(q4ans == 210)
  {
    totalScore += 2;
  }
  if(q5ans == 944)
  {
    totalScore += 4;
  }
  if(q6ans == 9)
  {
    totalScore += 4;
  }
  if(q7ans == 99)
  {
    totalScore += 5;
  }
  if(q8ans == 2023)
  {
    totalScore += 5;
  }
  if(q9ans == 1999)
  {
    totalScore += 5;
  }
  if(q10ans == 2)
  {
    totalScore += 5;
  }
  if(q11ans == 19)
  {
    totalScore += 7;
  }
  if(q12ans == 32)
  {
    totalScore += 7;
  }
  if(q13ans == 1008652)
  {
    totalScore += 7;
  }
  if(q14ans == 8300)
  {
    totalScore += 8;
  }
  if(q15ans == 2)
  {
    totalScore += 8;
  }
  if(q16ans == 784)
  {
    totalScore += 8;
  }
  if(q17ans == 30)
  {
    totalScore += 10;
  }
  if(q18ans == 75520)
  {
    totalScore += 11;
  }
  if(q19ans == 1000)
  {
    totalScore += 14;
  }
  if(q20ans == 299599)
  {
    totalScore += 15;
  }
  var query = "";
  query = "UPDATE Grades SET q1='" + Number(q1ans == 0) + "', q2='" + Number(q2ans == 503) + "',q3='" + Number(q3ans == 511) + "',q4='" + Number(q4ans == 210) + "',q5='" + Number(q5ans == 944) + "',q6='" + Number(q6ans == 9) + "',q7='" + Number(q7ans == 99) + "',q8='" + Number(q8ans == 2023) + "',q9='" + Number(q9ans == 1999) + "',q10='" + Number(q10ans == 2) + "',q11='" + Number(q11ans == 19) + "',q12='" + Number(q12ans == 32) + "',q13='" + Number(q13ans == 1008652) + "',q14='" + Number(q14ans == 8300) + "',q15='" + Number(q15ans == 2) + "',q16='" + Number(q16ans == 784) + "',q17='" + Number(q17ans == 30) + "',q18='" + Number(q18ans == 75520) + "',q19='" + Number(q19ans == 1000) + "',q20='" + Number(q20ans == 299599) + "',totalscore='" + totalScore + "' WHERE teamname='" + teamname + "';";
  await queryAsync(query);
  res.send({success: "Solutions Submitted Sucessfully!"});
});

app.get("/GetCSV", async (req, res)=>{
  /*
  res.sendFile(__dirname + "/signup.html");
  */
 var query1 = "SELECT * FROM Grades";
 result = await queryAsync(query1);
 var largeStr = "";
 for(const row of result)
 {
    var query2 = "SELECT * FROM Participants WHERE teamname='" + row.teamname + "';";
    result2 = await queryAsync(query2);
    if(result2[0] == undefined)
    {
      console.log("Skipped Team: " + row.teamname);
    }
    else
    {
      largeStr += result2[0].teamname + "," + result2[0].leaderfirstname + "," + result2[0].leaderlastname + "," + result2[0].membertwofirstname + "," + result2[0].membertwolastname;
    }
 }
});

app.post("/GetResults", async (req, res)=>{
  teamname = req.body["teamname"];
  var query = "SELECT * FROM Grades WHERE teamname='" + teamname + "';";
  result = await queryAsync(query);
  console.log(query);
  console.log(result);
  data = {q1: result[0].q1, q2: result[0].q2, q3: result[0].q3, q4: result[0].q4, q5: result[0].q5, q6: result[0].q6, q7: result[0].q7, q8: result[0].q8, q9: result[0].q9, q10: result[0].q10, q11: result[0].q11, q12: result[0].q12, q13: result[0].q13, q14: result[0].q14, q15: result[0].q15, q16: result[0].q16, q17: result[0].q17, q18: result[0].q18, q19: result[0].q19, q20: result[0].q20, totalscore: result[0].totalscore};
  res.send(data);
})


app.listen(PORT, ()=>{
    console.log("Server is listening on port " + PORT);
});
