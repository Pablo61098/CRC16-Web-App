const express = require("express"),
      CRC16 = require('./CRC16.js'),
      bodyParser = require('body-parser');

let app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res){
    console.log("Haciendo un get");
    res.redirect("/calculate");
});

app.get("/calculate", function(req, res){
    console.log("Haciendo un get");
    res.render("index", {type: 'calculate', result: false});
});

app.get("/check", function(req, res){
    console.log("Haciendo un get");
    res.render("index", {type: 'check',result: false});
});



app.post("/calculate", function(req, res){
    console.log(req.body);
    message = new CRC16(req.body.message);
    information = message.getRemainder();
    console.log(information);
    // console.log(req.params.type);
    console.log("Haciendo un post");
    res.render("index", {type: 'calculate',result: true, information: information, len: message.binaryMessageArray.length });
});

app.post("/check", function(req, res){
    
    res.render("index", {type: 'check', result: true, message: req.body.message});
});

app.listen(3000, function(req, res){
    console.log("El servidor ha comenzado en el puerto 3000");
});