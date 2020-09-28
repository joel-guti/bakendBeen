//1 creamos un archivo .js donde sea que será nuestro script

//2 conectamos con mongo
const mongoose = require("mongoose");

//3 conectamos con mongo como siempre, usando mongodb, las opciones (useUnifiedTopology,useNewUrlParser) y luego el then para cuando es ok la conexión y el catch para cuando falla

//5 para este ejemplo vamos a crear usuarios automaticamente por lo que importamos el modelo de usuarios

const movie = require("../models/HelpContact");

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
                                                    phone: { type: String, require: true },
                                                    email: { type: String, unique: true },
                                                    description: { type: String, default: "Hola contacta conmigo a traves de mi numero de telefono" },
                                                   Helper: { tyoe: String, require: true },
                                                    */

        const removeRandom = (array) => {
            while (array.length) {
                const random = Math.floor(Math.random() * array.length);
                const el = array.splice(random, 1)[0];
                console.log(el);
            }
        };

        //teniendo un array var a = ["a" , "b"]
        //sacamos un random de 0 a longitud del array o sea entre 0 y el array.length

        const arr = [
            "donaxt-mail.com",
            "taddoo.com",
            "tickendymail.com",
            "zaramatre_mail.com",
            "bankia.com",
            "Hubtype.com",
            "multiverseconputing.com",
            "singicat-mail.com",
            "dain-mail.com",
            "UCapture.com",
        ];

        function randomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        for (var i = 1; i < 101; i++) {
            let domain = arr[randomInteger(0, arr.length)];

            let newHelper = new movie({
                name: `Alberto Gomez Toribio ${i}`,
                phone: i,
                email: `agomez${i}@${domain}`,
                description: "Hola contacta conmigo a traves de mi numero de telefono o email",
                Helper: "Hola, me llamo Alberto",
            });
            if ((domain = "bankia.com")) {
                console.log("Es el banco español (Bankia)");
            } else {
                console.log("es una stutup");
            }
            await newHelper.save();
            console.log(newHelper.name);

            console.log(newHelper.email);
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