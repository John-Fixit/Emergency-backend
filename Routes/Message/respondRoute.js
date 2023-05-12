
const app = require('express');
const { getRespond, sendRespond } = require('../../Controllers/Message/respondController');
const respondRouter = app.Router();

respondRouter.get('/:category', getRespond);
respondRouter.post('/comment', sendRespond);

module.exports = {respondRouter};