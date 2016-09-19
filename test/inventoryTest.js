var assert = require("assert");
var request = require("supertest");

it("Should query by id", function(done) {
    var repo = require("../inMemory")();
    repo._items([{isbn: "1234", count: 1}]);
    var app = require("../app.js")(repo);

    request(app)
        .get('/stock/1234')
        .expect(200, {count:1}, done);
});
it("allows to stock up items", function(done) {
    var app = require("../app.js")(require("../inMemory")());
    request(app)
        .post("/stock")
        .send({isbn: 1234, count: 10})
        .expect("Content-Type", /json/)
        .expect(200, {isbn: 1234, count: 10}, done);

});