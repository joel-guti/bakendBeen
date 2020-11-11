//1 creamos un archivo .js donde sea que será nuestro script

//2 conectamos con mongo
const mongoose = require("mongoose");
require('../config')
    //3 conectamos con mongo como siempre, usando mongodb, las opciones (useUnifiedTopology,useNewUrlParser) y luego el then para cuando es ok la conexión y el catch para cuando falla

//5 para este ejemplo vamos a crear usuarios automaticamente por lo que importamos el modelo de usuarios

const User = require("../models/Trivials");
const aleatorio = require("../functions/ramdom");

mongoose.Promise = global.Promise;

mongoose
    .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(async() => {
        //4 hacemos lo que queramos
        /*
                                    question: { type: String, require: true },
                            type: { type: String, default: "BackendDeen" },
                            ansews: [{ type: String }],
                            activate: { type: Boolean, require: true },
                            lastPlay: { type: Number, default: Date.now() },
                                */

        for (var i = 1; i < 100; i++) {
            let newUser = new User({
                question: `quen es pepe ${i}`,
                type: "insomnia",
                ansews: ["a", "b", "c", "d"],
                activate: aleatorio.getRandomArbitrary(0, 2),
                correct: aleatorio.getRandomArbitrary(0, 5),
            });

            let name = newUser.question;
            let pointis = newUser.ansews;

            console.log(name);
            console.log(pointis);
            console.log();

            await newUser.save();
        }

        console.log("Proceso de creación de usuarios terminada");
        process.exit(0);
    })
    .catch((err) => {
        console.log(`error al conectar con mongo ${err}`);
    });

//6 para lanzar el script, nos apuntamos el nombre y ubicación de este archivo que hemos creado, por ejemplo este esta en scripts/create-users.js
//y nos vamos al archivo package.json
// en este archivo tenemos que buscar un campo llamado scripts, y lo que hacemos es agregar nuestro propio scripts manteniendo los que ya haya. A la izquierda le ponemos el nombre con el que queramos lanzar el script, por ejemplo usarios y a la derecha escribimos node y la ruta. Todo junto quedaría asi:
// "usuarios" : "node ./scripts/create-users.js"
//para lanzar el script hay que escribir npm run usuarios