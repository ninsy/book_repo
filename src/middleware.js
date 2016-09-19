var handlers = {
    clientError: function(req, res, next) {
        var err = new Error("Not found");
        err.status = 404;
        next(err);
    },
    serverError: function(err, req, res, next) {
        res.status(err.status || 500);
        console.error(err.stack);
        res.json({
            message: err.message,
            error: (process.env.NODE_ENV === "prod") ? {}: err.stack
        })
    },
    logIncoming: function(req, res, next) {
        console.log("Incoming request " + new Date());
        next();
    }
};

module.exports = handlers;