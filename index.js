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
// const Pusher = require('pusher')
// const credentials = require('./Controllers/USSD/cred')
// const africastalking = require('africastalking')(credentials.AT)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(json({ limit: "100mb" }));
app.use(cors({ origin: "*" }));
// app.get("/", function (req, res) {
//   res.status(200).json({ message: "Hello world", status: true });
// });
// const pusher = new Pusher(credentials.pusher)
// var webURL = 'http://foodigo.com/menu'
// var welcomeMsg = `CON Hello and welcome to Emergency notification system!
// Please find our menu ${webURL}
// Enter your name to continue`
// var orderDetails = {
//     name: "",
//     description: "",
//     address: "",
//     telephone: "",
//     open: true
// }
// var lastData = "";
// app.post('/ussd/report', (req,res) => {
//   const {sessionId, serviceCode, phoneNumber, text} = req.body
//   var textValue = text.split('*').length
//  var message = ""
//   console.log(req.body)
//   //configure /order api

//   if(text === ''){
//       message = welcomeMsg
//   }else if(textValue === 1){
//       message = "CON What do you want to eat?"
//       orderDetails.name = text;
//   }else if(textValue === 2){
//       message = "CON Where do we deliver it?"
//       orderDetails.description = text.split('*')[1];
//   }else if(textValue === 3){
//       message = "CON What's your telephone number?"
//       orderDetails.address = text.split('*')[2];
//   }else if(textValue === 4){
//       message = `CON Would you like to place this order?
//       1. Yes
//       2. No`
//       lastData = text.split('*')[3];
//   }else{
//       message = `END Thanks for your order
//       Enjoy your meal in advance`
//       orderDetails.telephone = lastData   
//   }
  
//   res.contentType('text/plain');
//   res.send(message, 200);
//   if(orderDetails.name != "" && orderDetails.address != ''&& orderDetails.description != '' && orderDetails.telephone != ''){
//     pusher.trigger('orders', 'customerOrder', orderDetails)
//     } 

//     if(orderDetails.telephone != ''){
//       //reset data
//       orderDetails.name= ""
//       orderDetails.description= ""
//       orderDetails.address= ""
//       orderDetails.telephone= ""
//     }


// })

app.use("/org", orgRoute);
app.use("/msg", messageRouter);
app.use("/respond", respondRouter)

//mongoDB connection
connection();

const PORT = process.env.PORT || 4001;
let server = app.listen(PORT, (req, res) => {
  console.log(`Server is responding on port: ${PORT}`);
});

//implementing the socket.io
const io = socket(server, { cors: { origin: "*" } });
io.on("connection", (socket) => {
  socket.on('signIn', (data)=>{
    socket.join(data.category);
  })
  socket.on("sendMsg", async(data) => {
     socket.broadcast.to(data.category).emit('msgResponse', data)
  })

});
