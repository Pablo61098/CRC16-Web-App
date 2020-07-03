const express = require("express"),
      CRC16 = require('./CRC16.js'),
      bodyParser = require('body-parser');

let app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res){
    res.render("index");
});

app.post("/", function(req, res){
    console.log(req.body);
    message = new CRC16(req.body.message);
    information = message.getRemainder();
    console.log(information);
    res.render("index", {information: information, len: message.binaryMessageArray.length });
});

app.listen(3000, function(req, res){
    console.log("El servidor ha comenzado en el puerto 3000");
});