
const app = require('express');
const { getRespond, sendRespond, getMsgComments } = require('../../Controllers/Message/respondController');
const respondRouter = app.Router();

respondRouter.get('/:category', getRespond);
respondRouter.post('/comment', sendRespond);
respondRouter.get('/comment/:msgId', getMsgComments)

module.exports = {respondRouter};