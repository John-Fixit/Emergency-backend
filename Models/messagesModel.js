const {default: mongoose} = require("mongoose")

const messageSchema = new mongoose.Schema({
        category: {
            type: String,
            require: true
        },
        message: {
            text: {
                type: String,
                default: ""
            },
            voice: {
                type: String,
                default: ""
            },
            video: {
                type: String,
                default: ""
            },
        },
        location: {
            type: String,
            require: true
        }
},
{ timestamps: true }
)

const messageModel = mongoose.model("messages", messageSchema)

module.exports = {messageModel}