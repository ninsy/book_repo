var MongoClient = require("mongodb").MongoClient;

var dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/book_inventory_service";

var collection = "books_kamil";
var dbHandler = MongoClient.connect(dbUrl, {db: {bufferMaxEntries: 0}})
    .then(function(db) {
        return db;
    })
    .catch(function(err) {
        console.error(err);
        process.exit(1);
    });

var stockRepository = {
    findByIsbn: function(isbn) {
        return dbHandler
            .then(function(handler) {
                return handler
                    .collection(collection)
                    .find({"isbn": isbn})
                    .limit(1)
                    .next()
            })
            .then(function(result) {
                if(result) {
                    return result.count;
                } else {
                    return null;
                }
            })
    },
    findAll: function() {
        return dbHandler
            .then(function(handler) {
                return handler
                    .collection(collection)
                    .find({})
                    .toArray()
            })
    },
    stockUp: function(isbn, count) {
        return dbHandler
            .then(function(handler) {
                return handler
                    .collection(collection)
                    .updateOne(
                        {isbn: isbn+""},
                        {isbn:isbn, count: count},
                        {upsert: true}
                    )
            })
    }
};

module.exports = stockRepository;