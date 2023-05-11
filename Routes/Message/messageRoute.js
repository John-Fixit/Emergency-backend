const app = require('express');
const { sendMsg } = require('../../Controllers/Message/send_controller');
const { getMsg } = require('../../Controllers/Message/get_controller');
const messageRouter = app.Router()

messageRouter.post('/sendMsg', sendMsg)
messageRouter.get("/:category", getMsg)
module.exports ={messageRouter}