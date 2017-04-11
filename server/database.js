const MongoClient = require('mongodb').MongoClient

const connectionString = 'mongodb://marvel:marvel@ds155080.mlab.com:55080/marvelfightdatabase';
let db;

const connect = function (callback) {
    MongoClient.connect(connectionString, function (err, database) {
        if (err) {
            callback(err);
            return;
        }

        db = database;
        callback();
    })
};

const save = function (collection, data, callback) {
    db.collection(collection).save(data, callback)
}
const updateToplist = function () {
    var retValue = 'HELLO WORLD'
    //Groups by name and sorts by number of times winning
    db.collection('match').find().toArray(function (err, result) {
        
       retValue = result[5].winner
       return retValue
    })
    //HOW DO WE WAIT FOR retValue to finish?
    
}
module.exports.connect = connect;
module.exports.save = save;
module.exports.updateToplist = updateToplist;