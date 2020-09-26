//1 creamos un archivo .js donde sea que será nuestro script

//2 conectamos con mongo
const mongoose = require("mongoose");

//3 conectamos con mongo como siempre, usando mongodb, las opciones (useUnifiedTopology,useNewUrlParser) y luego el then para cuando es ok la conexión y el catch para cuando falla

//5 para este ejemplo vamos a crear usuarios automaticamente por lo que importamos el modelo de usuarios

const deals = require("../models/Deals");
const funtremdom = require("../functions/ramdom");

mongoose.Promise = global.Promise;
/*
    name: { type: String, require: true },
    description: { type: String, default: "Este reto no tiene descripcion" },
    image: { type: String, require: true },
    activate: { type: Boolean, default: true },
    award: { type: String, default: "3 puntos + 1 palicula" },
*/

mongoose
    .connect("mongodb://localhost:27017/movis", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(async() => {
        //4 hacemos lo que queramos

        for (var i = 1; i < 101; i++) {
            let newDeal = new deals({
                name: `trivial ${i}`,
                description: `juege el trivial ${i}`,
                image: "https://www.google.com",
                activate: funtremdom.getRandomArbitrary(0, 2),
                award: `${i + 1} puntos`,
                urlHtml : "https://www.google.com"
                
            });

            await newDeal.save();
            console.log(newDeal.name ,newDeal.description);
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