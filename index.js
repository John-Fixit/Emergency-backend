const app = require('express')()
require("dotenv").config()
const cors = require('cors')
const { connection } = require('./config')
const { messageRouter } = require('./Routes/Message/messageRoute')
const { orgRoute } = require('./Routes/Organization/orgRoute')
const bodyParser = require("body-parser")
const { json } = require('express')
// const socket = require("socket.io")

app.use(bodyParser.urlencoded({extended: true}))
app.use(json({limit: "100mb"}))
app.use(cors({origin: "*"}))

app.get("/", function(req, res){
    res.status(200).json({message: "Hello world", status: true})
})

app.use("/org", orgRoute);
app.use("/msg", messageRouter);
//mongoDB connection
connection()



const PORT = process.env.PORT || 4001 
let server = app.listen(PORT, (req, res)=>{
    console.log(`Server is responding on port: ${PORT}`)
})
//implementing the socket.io
// const io = socket(server, {cors: {origin: "*"}})

// io.on("connection", (socket)=>{
   
//     console.log(`user with id: ${socket.id} connected `)

    
// })