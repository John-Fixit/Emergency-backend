const app = require("express")();
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config");
const { messageRouter } = require("./Routes/Message/messageRoute");
const { orgRoute } = require("./Routes/Organization/orgRoute");
const bodyParser = require("body-parser");
const { json } = require("express");
const socket = require("socket.io");
const { respondRouter } = require("./Routes/Message/respondRoute");
const Pusher = require('pusher')
const credentials = require('./Controllers/USSD/cred')
const africastalking = require('africastalking')(credentials.AT)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(json({ limit: "100mb" }));
app.use(cors({ origin: "*" }));

app.get("/", function (req, res) {
  res.status(200).json({ message: "Hello world", status: true });
});
app.post('/ussd/report', (req,res) => {
  console.log(req.body)
  //configure /order api
})

app.use("/org", orgRoute);
app.use("/msg", messageRouter);
app.use("/respond", respondRouter)

//mongoDB connection
connection();
//pusher codes//
const pusher = new Pusher(credentials.pusher)
var webURL = 'http://foodigo.com/menu'
var welcomeMsg = `CON Hello and welcome to Emergency notification system!
Please find our menu ${webURL}
Enter your name to continue`
var orderDetails = {
    name: "",
    description: "",
    address: "",
    telephone: "",
    open: true
}
var lastData = "";

//
const PORT = process.env.PORT || 4001;
let server = app.listen(PORT, (req, res) => {
  console.log(`Server is responding on port: ${PORT}`);
});

//implementing the socket.io
const io = socket(server, { cors: { origin: "*" } });
let connectedOrgs = [];
io.on("connection", (socket) => {
  console.log("user connected with id: "+ socket.id);
  socket.on('signIn', (data)=>{
    socket.join(data.category);
    // connectedOrgs.push(data);
  })
  socket.on("sendMsg", async(data) => {
     socket.broadcast.to(data.category).emit('msgResponse', data)
  });
  socket.on('signOut', (data)=>{
     connectedOrgs = connectedOrgs.filter((org)=>org.id != data.id)
  })


  socket.on("disconnect", () => {
    console.log(`user disconnected`);
  });
});
