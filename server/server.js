const path = require('path')
const express = require('express')

const port = process.env.PORT || 4000
const app = express()

app.use(express.static(path.join(__dirname, '../client')))

app.listen(port, function(){
    console.log(`Listening to port ${port}`)
})