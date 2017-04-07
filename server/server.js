const path = require('path')
const express = require('express')
const database = require('./database')
const bodyParser = require('body-parser');

const port = process.env.PORT || 4000
const app = express()

app.use(express.static(path.join(__dirname, '../client')))
app.use(bodyParser.urlencoded({extended : true}))

app.post('/vote', function(req, res){
    
    database.save('match', req.body, function(err, result) {
        if (err) return console.log(err)

        console.log('IT WORKED!');
        res.json({ success:true });
        res.end();
    })
    console.log('TEST')
    database.updateToplist();
})

database.connect(function(error){
    if(error){
        console.log(error);
        return;
    }

    app.listen(port, function(){
        console.log(`Listening to port ${port}`);
    })
})
