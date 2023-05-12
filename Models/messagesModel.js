const {default: mongoose, models} = require("mongoose")

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
            audio: {
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
        },
        respond: {
            type: Boolean,
            default: false
        }
},
{ timestamps: true }
)

const respondedSchema = new mongoose.Schema(
    {
        messageId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        },
        comment: {
            type: String
        },
        messageCategory: {
            type: String
        },
        responderOrgId: {
            type: mongoose.Schema.Types.ObjectId
        }
    },
    { timestamps: true }
)

const messageModel = mongoose.model("messages", messageSchema)
const respondedModel = mongoose.model('responded-message', respondedSchema);
module.exports = {messageModel, respondedModel};