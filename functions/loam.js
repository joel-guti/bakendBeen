const usuarios = require("../models/User");
const mongoose = require("mongoose");
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

async function solicitLoan(userMail) {
    let userSolicit = await usuarios.find({
        email: userMail,
    });
    userSolicit.points = points + 100;
    console.log("se concedio el prestamo de 100 monedas");
}

module.exports = { solicitLoan };