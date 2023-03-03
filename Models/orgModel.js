const {default: mongoose } = require('mongoose')
const orgSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        require: true
    }
}, {timestamps: true})

const orgModel = mongoose.model("Organization_tb", orgSchema)

module.exports = {orgModel}