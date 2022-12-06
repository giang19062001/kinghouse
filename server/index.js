const express = require("express")
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const dotenv = require("dotenv")


dotenv.config()

//router
const departRouter = require("./router/depart")
const formRouter = require("./router/form")

mongoose.connect((process.env.MONGODB_URL),()=> {console.log("connected to mongodb") })


app.use(cors({origin:"*"})) 
app.use (bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("common"))

app.use(express.static('images')); //anh cho fontend

//use router
app.use("/api/depart",departRouter)
app.use("/api/form",formRouter)


app.listen(process.env.PORT,() =>{
    console.log("server is running..." + process.env.PORT)
})
