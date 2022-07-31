require("dotenv").config();
const bodyParser = require("body-parser");
let express = require("express");
let app = express();
const absolutePath1 = __dirname + "/views/index.html";

//console.log("hello world");
app.use("/", bodyParser.urlencoded({ extended: false }));
app.route("/:name").post((req, res) => {
  res.json({ name: req.body.first + " " + req.body.last });
});
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/json", (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    return res.json({ message: message.toUpperCase() });
  }
  return res.json({ message: message });
});

app.get("/", (req, res) => {
  res.sendFile(absolutePath1);
  //   res.send("Hello Express");
});
app.use(express.static(__dirname));
module.exports = app;
