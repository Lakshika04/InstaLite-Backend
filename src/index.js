import express from 'express'
import connectDb from './config/database.js';
import router from './routes/auth.route.js';

const app = express();

app.use(express.json());

//database conneection
connectDb();

app.get('/',(req,res)=>{
    res.send("server is running")
})


//routes
app.use("/auth",router)


app.listen(5000,()=>{
    console.log("server is running on port 5000")
})