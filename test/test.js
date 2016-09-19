var assert = require("assert");
var request = require("supertest");
var MongoClient = require("mongodb").MongoClient;
var app = require("../app")(require("../inMemory"));

var dbUrl = "mongodb://localhost:27017/book_inventory_service";

const testStock ={
    isbn: 123,
    count: 2
};

describe("MongoDB tests", function() {
   it("Should connect", function() {
       MongoClient.connect(dbUrl, function(err,db) {
           assert.equal(null, err);
           console.log("Connected to db!");
           db.close();
       });
   });
});

describe("general request tests", function () {
   it("Should return code 200 on GET /", function() {
        request(app)
            .get("/")
            .expect(200);
   });
});

describe("stock test", function () {
    it("should handle POST requests with isbn/count params and echo data", function(done) {
        request(app)
            .post("/stock")
            .set("Accept", "application/json")
            .send(testStock)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.isbn, testStock.isbn);
                assert.equal(res.body.count, testStock.count);
            })
            .end(done)
    });
});

