const app = require('express');
const { sendMsg } = require('../../Controllers/Message/send_controller');
const messageRouter = app.Router()

messageRouter.post('/sendMsg', sendMsg)




module.exports ={messageRouter}