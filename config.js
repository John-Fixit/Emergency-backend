const mongoose = require("mongoose")
require("dotenv").config()

URI = process.env.URI
mongoose.set("strictQuery", false)
const connection=()=> mongoose.connect(URI, (err, conn_data)=>{
    err?console.log(`Mongoose not connect`): console.log(`Mongoose connected successfully`)  
})

module.exports = {connection}