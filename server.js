var app = require("./app")(require("./stockRepository"));

app.listen(process.env.PORT || 3000, function () {
   console.log("Listenin on port 3000");
});