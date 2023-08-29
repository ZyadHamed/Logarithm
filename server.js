const express = require("express")
const app = express()
const PORT = process.env.PORT | 5000;
app.get("/", (req, res)=>{
    res.json({reply:"Hello from the other side!"})
})
app.listen(PORT, ()=>{
    console.log("Server is listening....")
})