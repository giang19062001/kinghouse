const express = require("express")
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const dotenv = require("dotenv")


dotenv.config()

mongoose.connect((process.env.MONGODB_URL),()=> {console.log("connected to mongodb") })


app.use(cors({origin:"*"})) 
app.use (bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("common"))

app.use(express.static('images')); //anh cho fontend

//router
const departRouter = require("./router/depart")
const formRouter = require("./router/form")
const serviceRouter = require("./router/service")
//use router

app.use("/api/depart",departRouter)
app.use("/api/form",formRouter)
app.use("/api/service",serviceRouter)


app.listen(process.env.PORT,() =>{
    console.log("server is running..." + process.env.PORT)
})
