var app = require("./app")(require("./stockRepository"));

app.listen(process.env.PORT || 4000, function () {
   console.log("Listenin on port 4000");
});