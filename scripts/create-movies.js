//1 creamos un archivo .js donde sea que será nuestro script

//2 conectamos con mongo
const mongoose = require("mongoose");

//3 conectamos con mongo como siempre, usando mongodb, las opciones (useUnifiedTopology,useNewUrlParser) y luego el then para cuando es ok la conexión y el catch para cuando falla

//5 para este ejemplo vamos a crear usuarios automaticamente por lo que importamos el modelo de usuarios

const movie = require("../models/Movies");
const ramdom = require("../functions/ramdom");

mongoose.Promise = global.Promise;

mongoose
    .connect("mongodb://localhost:27017/movis", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(async() => {
        //4 hacemos lo que queramos
        /*
                                         titele: { type: String, require: true },
                                                                                            subtitele: { type: String, require: false },
                                                                                            poster: { type: String },
                                                                                            director: { type: String, require: true },
                                                                                            premiereage: { type: Number },
                                                                                            budget: { type: Number, defaut: 300 },
                                                                                            duration: { type: String, require: true },
                                                                                            trailerurl: { type: String, require: true },
                                                                                            actors: { type: String },
                                     */

        for (var i = 1; i < 101; i++) {
            let newUser = new movie({
                titele: `La vecina ${i}`,
                poster: { type: String },
                director: `Paco Mirella ${i}`,
                premiereage: ramdom.getRandomArbitrary(1920, 2040),
                duration: 100,
                thumb: "https://firebasestorage.googleapis.com/v0/b/donext-collections.appspot.com/o/5a27cdfd52b1cc0d022e6d5c.png?alt=media&token=c36d784b-0671-4bb5-ba95-c34fe38c9488",
                trailerurl: `https://firebasestorage.googleapis.com/v0/b/donext-collections.appspot.com/o/Mala_Suerte__Mickey_Mouse_hd.mp4?alt=media&token=36b5998f-dbc0-41f5-bdc4-751dbd05f508`,
                actors: "paco leon , Santiago segura , Rosa maria sarda",
            });

            await newUser.save();
            console.log(newUser.director, newUser.titele, newUser.premiere);
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