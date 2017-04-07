const MongoClient = require('mongodb').MongoClient

const connectionString = 'mongodb://simon:simon@ds041526.mlab.com:41526/testtempdb';
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