const MongoClient = require('mongodb').MongoClient

const connectionString = 'mongodb://marvel:marvel@ds155080.mlab.com:55080/marvelfightdatabase';
let db;

const connect = function(callback) {
    MongoClient.connect(connectionString, function(err, database) {
        if (err) {
            callback(err);
            return;
        }

        db = database;
        callback();
    })
};

const save = function(collection, data, callback) {
    db.collection(collection).save(data, callback)
}
module.exports.connect = connect;
module.exports.save = save;