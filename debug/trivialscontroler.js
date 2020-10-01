const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

//Usuario : JoelGutiGuti password :
//en debug todas las rutas deben de termonar en dev por ejempo /trivialscreatedev

//arrancar mongod ahora es mongod --dbpath /users/joel/data/db/
// o
// brew services start mongodb-community@4.4
// para pararlo
// brew services stop mongodb-community@4.4
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;
//conectamos con la base de datos, usando la funcion connect, como parametro metelos la url de conexión, que si local sera en localhost etc.EL then es lo que ocurre si la conexion es correcta, y el catch, es una función que se ejecuta si sucede algun error. Para pruebas en local, obviamente primero hay que lanzar mongo con mongod en un terminal

mongoose
    .connect("mongodb://localhost:27017/movis", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        //ponemos a escuchar el servidor
        app.listen(3000, () => {
            console.log("escuchando");
        });
    })
    .catch((err) => {
        console.log("error al conectar con mongo");
    });

const trivials = require("../models/Trivials");

app.post("trivialsdev", async(req, res) => {
    let trivias = await trivials.find().limit(6);

    res.send(trivias);
});

app.post("trivialscreatedev", (req, res) => {});
app.post("trivialsplay3dev", (req, res) => {});