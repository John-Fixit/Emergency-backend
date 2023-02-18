const {default: mongoose} = require("mongoose")

const messageSchema = new mongoose.Schema({
        category: {
            type: String,
            require: true
        },
        message: {
            text: {
                type: String,
            },
            voice: {
                type: String,
            },
            video: {
                type: String,
            }
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