//1 creamos un archivo .js donde sea que será nuestro script

//2 conectamos con mongo
const mongoose = require("mongoose");

//3 conectamos con mongo como siempre, usando mongodb, las opciones (useUnifiedTopology,useNewUrlParser) y luego el then para cuando es ok la conexión y el catch para cuando falla

//5 para este ejemplo vamos a crear usuarios automaticamente por lo que importamos el modelo de usuarios

const User = require("../models/Store");
const aleatorio = require("../functions/ramdom");
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

                             name: { type: String, require: true },
                        description: { type: String, require: true },
                        product: { type: Schema.Types.ObjectId, ref: "Movie" },
                        activate: { type: Boolean, require: true },
                        thumb: { type: String, require: true },
                        pricing: { type: Number, require: true },
            
                             */

        for (var i = 1; i < 20; i++) {
            function randomInteger(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            const arr = [
                ObjectId("5f7dd5a192c31fa4cdfda128"),
                ObjectId("5f7337cb1d9968074dd67805"),
                ObjectId("5f7dd64792c31fa4cdfda145"),
            ];

            let peli = arr[randomInteger(0, arr.length)];

            let newUser = new User({
                name: `Premio ${i}`,
                description: `al ver oadre no hay mas que uno 2 y compra el premio ${i} `,
                product: peli,
                activate: ramdom.getRandomArbitrary(0, 2),
                thumb: "https://firebasestorage.googleapis.com/v0/b/donext-collections.appspot.com/o/card_dc_01_front.jpg?alt=media&token=a88a43c0-6e42-4ec6-9604-634cf0fd0ee3",
                pricing: ramdom.getRandomArbitrary(0, 51),
            });
            /*
            let name = newUser.name;
            let pointis = newUser.description;

            console.log(name);
            console.log(pointis);
            console.log();
*/
            await newUser.save();
        }

        console.log("Proceso de creación de usuarios terminada");
        process.exit(0);
    })
    .catch((err) => {
        console.log(`
                            error al conectar con mongo $ { err }
                            `);
    });

//6 para lanzar el script, nos apuntamos el nombre y ubicación de este archivo que hemos creado, por ejemplo este esta en scripts/create-users.js
//y nos vamos al archivo package.json
// en este archivo tenemos que buscar un campo llamado scripts, y lo que hacemos es agregar nuestro propio scripts manteniendo los que ya haya. A la izquierda le ponemos el nombre con el que queramos lanzar el script, por ejemplo usarios y a la derecha escribimos node y la ruta. Todo junto quedaría asi:
// "usuarios" : "node ./scripts/create-users.js"
//para lanzar el script hay que escribir npm run usuarios