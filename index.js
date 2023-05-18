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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(json({ limit: "100mb" }));
app.use(cors({ origin: "*" }));

app.use("/org", orgRoute);
app.use("/msg", messageRouter);
app.use("/respond", respondRouter)

//mongoDB connection
connection();
const PORT = process.env.PORT || 4001;
let server = app.listen(PORT, (req, res) => {
  console.log(`Server is responding on port: ${PORT}`);
});

//Socket.io
const io = socket(server, { cors: { origin: "*" } });
let connectedOrgs = [];
io.on("connection", (socket) => {
  socket.on('signIn', (data)=>{
    socket.join(data.category);
   
  })
  socket.on("sendMsg", async(data) => {
     socket.broadcast.to(data.category).emit('msgResponse', data)
  })
  socket.on('signOut', (data)=>{
     connectedOrgs = connectedOrgs.filter((org)=>org.id != data.id)
  })

});
