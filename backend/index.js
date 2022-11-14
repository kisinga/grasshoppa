const express = require("express")
const PORT = 8080
const app = express();

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  const data = {volts: 10, current: 20, price: 15};
  res.render("index", {data: data});
});

app.listen(PORT, function () {
  console.log(`Server is running on port: ${PORT}: `);
});
