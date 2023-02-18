const app = require('express')()
require("dotenv").config()
const cors = require('cors')
const {graphqlHTTP} = require("express-graphql")
const { connection } = require('./config')
const schema = require("./schema")
app.use(
    "/graphql", 
    graphqlHTTP({
        schema: schema,
        graphiql: true
    })
)
//mongoDB connection
connection()

app.use(cors({
    origin: "*",
}))


const PORT = process.env.PORT || 4001 
app.listen(PORT, (req, res)=>{
    console.log(`Server is responding on port: ${PORT}`)
})