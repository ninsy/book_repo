var express = require("express"),
    parser = require("body-parser"),
    middleware = require("./src/middleware");


module.exports = function(repo) {
    var app = express();
    var routes = require("./src/router")(repo);


    app.use(parser.json());

    app.use(middleware.logIncoming);

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', "*");
        next();
    });


    app.get("/", routes.root);
    app.get("/stock/:id", routes.getCount);
    app.get("/stocks", routes.getAll);
    app.post("/stock", routes.upsertStock);

    app.use(middleware.clientError);
    app.use(middleware.serverError);

    return app;
};






