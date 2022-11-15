const express = require("express")
const PORT = 8080
const app = express();
var { read } = require('./read');


app.set("view engine", "ejs");

app.get("/", function (req, res) {
  const message = read();
  console.log(message)
  res.render("index", {message: message});
});

app.listen(PORT, function () {
  console.log(`Server is running on port: ${PORT}: `);
});
