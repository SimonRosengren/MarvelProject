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
const updateToplist = function (callback) {
    //var retValue = 'HELLO WORLD'
    //Groups by name and sorts by number of times winning
    db.collection('match').find().toArray(function (err, result) {
        
       retValue = result[5].winner
       callback(retValue)
    })
    //HOW DO WE WAIT FOR retValue to finish?
    
}

/*const updateToplist = function (callback) {
    //Groups by name and sorts by number of times winning
    var retValue
    db.collection('match').aggregate([{
        "$group": { _id: "$winner", count: { "$sum": 1 } }
    }, {
        "$sort": { count: -1 }
    }], function (err, docs) {
        var keys = []
        docs.forEach(function (doc) {
            
            retValue = JSON.stringify(doc) // do what you want here.
            callback(retValue)
        });
    });
}*/

module.exports.connect = connect;
module.exports.save = save;
module.exports.updateToplist = updateToplist;