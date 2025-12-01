import express from 'express'
import connectDb from './config/database.js';

const app = express();

app.use(express.json());

//database conneection
connectDb();

app.get('/',(req,res)=>{
    res.send("server is running")
})

app.listen(5000,()=>{
    console.log("server is running on port 5000")
})