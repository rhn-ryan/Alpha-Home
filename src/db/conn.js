const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;


const MONGODB_URI = process.env.ATLAS_URI

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/loyalRegisteration",
{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>{
    console.log("connected to db");
}).catch(()=>{
    console.log("db not connected");
})


