var repo;

var router = {
    root: function(req, res) {
        res.send("Hello world, mate!");
    },
    getCount: function(req, res, next) {
        repo
            .findByIsbn(req.params.id)
            .then(function(result) {
                if(result) {
                    res.json({count: result})
                } else {
                    res.status(404).send({message: "Book with " + req.params.id + " doesnt exist."});
                }
            })
            .catch(next);
    },
    getAll: function(req, res, next) {
        res.status(200);
        repo
            .findAll()
            .then(function(result) {
                res.json(result);
            })
            .catch(next)
    },
    upsertStock: function(req, res, next) {
        res.status(200);
        repo
            .stockUp(req.body.isbn, req.body.count)
            .then(function() {
                res.json({
                    isbn: req.body.isbn,
                    count: req.body.count
                });
            })
            .catch(next)
    }
};

module.exports = function (repository) {
    repo = repository;
    return router;
};