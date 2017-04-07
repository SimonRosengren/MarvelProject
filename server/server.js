const path = require('path')
const express = require('express')
const database = require('./database')

const port = process.env.PORT || 4000
const app = express()

app.use(express.static(path.join(__dirname, '../client')))

app.post('/vote', function(req, res){
    database.save('match', req.body, function(err, result) {
        if (err) return console.log(err)

        console.log('IT WORKED!');
        res.json({ success:true });
        res.end();
    })
})

app.listen(port, function(){
    console.log(`Listening to port ${port}`)
})