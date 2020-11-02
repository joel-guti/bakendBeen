const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const ramdom = require('../functions/ramdom');
require("..")

app.post("/text", (req, res) => {
    function json() {
        let she = { name, description }
        console.log(she);
    }

    console.log("Se conecto un usuario a text");
    let body = req.body
    let name = body.name;
    let description = body.description;
    res.send({
        ok: true,
        name: name,
        description: description,
    });
    json();
});


app.post("")