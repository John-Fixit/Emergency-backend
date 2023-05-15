require('dotenv').config();
module.exports = {
    AT:{
        apiKey: process.env.AT_API_KEY,
        username: process.env.AT_USERNAME,
        format: 'json'
    },
    pusher:{
       appId: process.env.APP_ID,
       key: process.env.KEY,
       secret: process.env.SECRET,
       cluster: process.env.CLUSTER,
       encrypted: true
    }
   }
