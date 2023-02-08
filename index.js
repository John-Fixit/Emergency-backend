const app = require('express')()

const PORT = 4000 || 4001 


app.listen(PORT, (req, res)=>{
    console.log(`Backend is listening on port: ${PORT}`)
})