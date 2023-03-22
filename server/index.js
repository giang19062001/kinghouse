const express = require("express")
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const dotenv = require("dotenv")
const path = require('path');

dotenv.config()

mongoose.connect((process.env.MONGODB_URL),()=> {console.log("connected to mongodb") })


app.use(cors({origin:process.env.REACT_LOCALHOST})) 
app.use (bodyParser.json({limit:'100mb'})) 
app.use(bodyParser.urlencoded({ extended: true,limit:'100mb',parameterLimit: 100000000  }));
app.use(morgan("common"))

app.use(express.static('images')); //anh cho fontend
console.log(path.join(__dirname, '../client/public/index.html'))
// app.get('*', (req, res)=> {
//     const index = path.join(__dirname, '../client/public/index.html')
//     res.sendFile(index);
//   });

//router
const departRouter = require("./router/depart")
const formRouter = require("./router/form")
const serviceRouter = require("./router/service")
const ulDepartRouter = require("./router/ulDepart")
const ulHomeRouter = require("./router/ulHome")

//use router

app.use("/api/depart",departRouter)
app.use("/api/form",formRouter)
app.use("/api/service",serviceRouter)
app.use("/api/ulDepart",ulDepartRouter)
app.use("/api/ulHome",ulHomeRouter)


app.listen(process.env.PORT || 8000,() =>{
    console.log("server is running..." )
})
