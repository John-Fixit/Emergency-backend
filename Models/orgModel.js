const {default: mongoose } = require('mongoose')
const bcrypt = require('bcryptjs');
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
    },
    password: {
        type: String,
        require: true
    }
}, {timestamps: true})

orgSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10, (err, hashedPassword)=>{
        if(err){
            console.log('Unexpected error occur');
        }
        else{
            this.password = hashedPassword;
            next();
        }
    })
})

const orgModel = mongoose.model("Organization_tb", orgSchema)

module.exports = {orgModel}