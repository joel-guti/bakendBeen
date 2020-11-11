const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require("mongoose");


require('./config')

//const loan = require("./functions/loam");

//Usuario : JoelGutiGuti password :

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
    .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        //ponemos a escuchar el servidor
        app.listen(process.env.PORT, () => {
            console.log("escuchando");
        });
    })
    .catch((err) => {
        console.log("error al conectar con mongo");
        console.log(err);
    });
//Modelos
const moviesSchema = require("./models/Movies");
const userSchema = require("./models/User");
const dealSchema = require("./models/Deals");
const helper = require("./models/HelpContact");
const trivial = require("./models/Trivials");
const storeiten = require("./models/Store");
const Trivials = require("./models/Trivials");
require("./functions/ramdom")

app.post("/storecreate", async(req, res) => {
    let body = req.body;
    let myid = body.myid;
    let newStore = await storeiten.create(body);
    // Hacer lo de el credor : newStore.creator = myid
    newStore.creator = myid
    res.send({ success: true, newStore });
});
app.post("/store", async(req, res) => {
    let body = req.body;
    let idUser = body.idUser;
    let query = req.query;

    let elementos = parseInt(query.elementos);

    let skip = elementos * query.pagina;
    //http://192.168.1.43:3000/helper?elementos=5&skip=2
    //o
    //http://192.168.1.43:3000/helper

    console.log(query);

    let store = await storeiten.find().limit(elementos).skip(skip);
    res.send({ success: true, store });
});
app.post("/comfirmUser", async(req, res) => {
    let body = req.body;
    let id = body.id;
    let user = await userSchema.findById(id);
    res.send({ success: true, user });
});
app.post("/paystore", async(req, res) => {
    let body = req.body;
    let id = body.id;
    let myid = body.myid;
    let storeapp = await storeiten.findById(id);
    let user = await userSchema.findById(myid);

    if (!user) {
        return res.send({ success: false, message: "este usuario no existe" });
    }
    if (!storeapp) {
        return res.send({
            success: false,
            message: "no hay productios en la tienda",
        });
    }
    if (storeapp.activate == false) {
        return res.send({
            success: false,
            message: "no hay ningun produicto activado con ese ID",
        });
    }
    let beens = user.beens;
    let pricing = storeapp.pricing;

    if (beens < pricing) {
        return res.send({ success: false, message: "no tienes beens" });
    }

    beens = beens - pricing;
});

app.post("/helper", async(req, res) => {
    let query = req.query;

    let elementos = parseInt(query.elementos);

    let skip = elementos * query.pagina;
    //http://192.168.1.43:3000/helper?elementos=5&skip=2
    //o
    //http://192.168.1.43:3000/helper

    console.log(query);
    let ayudantes = await helper
        .find()
        .limit(elementos)
        .skip(skip)
        .select("-_id name  email  phone");
    console.log(ayudantes);
    res.send({
        ok: true,
        ayudantes,
    });
});
app.get("/", (req, res) => {});
app.post("/loan", async(req, res) => {
    let body = req.body;
    let usermail = body.email;
    let message = "Se conciedio el prestamo de 100 pts a " + usermail;
    let userSolicit = await usuarios.findOne({
        email: userMail,
    });
    userSolicit.beens = beens + 150;
    console.log("se concedio el prestamo de 100 monedas");

    res.send({
        ok: true,
        message,
    });
    console.log();
});
app.post("/addfriends", async(req, res) => {
    let body = req.body;
    let userId = body.userid;
    let friendId = body.friendid;

    console.log(userId);
    console.log(friendId);

    let user = await User.findById(userId);
    let friend = await User.findById(friendId);

    //sistema de autentificaccio :
    if (!user) {
        console.log("este usuaro no existe");
        return res.status(401).send({ success: false });
    }

    if (!friend) {
        console.log("este amigo no existe");
        return res.status(401).send({ success: false });
    }

    if (!user.friends) {
        user.friends = [];
    }

    if (user.id == friend) {
        return res.send({
            ok: false,
            message: "este usuario eres tu!",
        });
    }

    if (user.friends == friend) {
        return res.send({ ok: false, message: "este usuaro ye es tu amifo" });
    }
    user.friends.push(friend._id);

    await user.save();

    res.status(200).send({ success: true });
    console.log("se hizo un amigp");
});

app.post("/getCode", async(req, res) => {
    let body = req.body;
    let mail = body.email;
    let getCode = await userSchema
        .findOne({ email: mail })
        .select("username _id -__v");
    res.send({ ok: true, getCode });
});
app.post("/singin", async(req, res) => {
    let body = req.body;

    try {
        let newUser = await userSchema.create(body);

        newUser.__v = undefined;
        newUser.friends = undefined;

        res.send({
            ok: true,
            newUser,
        });
    } catch (err) {
        console.log(err);
        res.status(401).send({ success: false, mensaje: "el usuario ya existe" });
    }
});

app.post("/changePassword", async(req, res) => {
    let body = req.body;
    let id = body.id;
    let passwordnew = body.newpass;

    let user = await userSchema.findByIdAndUpdate({ _id: id }, { password: passwordnew }, { new: true });
    res.status(200).send({
        success: true,
        user,
    });
});

app.get("/trivils", async(req, res) => {
    trivial.findRandom({ activate: true, validate: true }, { lastPlay: 0, activate: 0 }, { limit: 6 },
        function(err, trivias) {
            if (err || !trivias) {
                return res.status(401).send({ success: false });
            }

            res.status(200).send({ success: true, trivias });
            trivias.lastPlay = Date.now;
        }
    );

    let trivialfind = await trivial.find({ activate: true });
    if (trivialfind == null) {
        let message = "No hay trivials activos";
        res.status(404).send({
            ok: false,
            message,
        });

        console.log("no hay trivials activos");
    } else {
        res.send({
            ok: true,
            trivialfind,
        });
    }

});
app.post("/trivials/pendingvalidate", async(req, res) => {
    let thejenn = await Trivials.find({ validate: false })
    res.send({
        thejenn
    })
})
app.post("/trivials/validate", async(req, res) => {
    let body = req.body
    let id = body.trivialid
    let trivial = await userSchema.findByIdAndUpdate({ _id: id }, { validate: true }, { new: true });
    console.log(trivial)

    res.send({ success: true })
})


app.get("/id", async(req, res) => {
    let findId = await userSchema.find().select("_id username email");
    console.log(findId);
    res.send({
        ok: true,
        findId,
    });
});

app.post("user/:alias", async(req, res) => {
    let params = req.params;
    let alias = params.alias;
    console.log(alias);
    let findonebyalias = userSchema.findOne({ username: alias });
    console.log(findonebyalias);
    res.send({
        ok: true,
        findonebyalias,
    });
});
app.get("/deals", async(req, res) => {
    let retos = await dealSchema
        .find({ activate: true })
        .select("-_id -__v -activate  ");
    res.send({
        retos,
    });
});
app.post("/playdeals", async(req, res) => {
    let reto = await dealSchema
        .find({ activate: true, name: req.body.name })
        .select("-_id -__v -activate  ");
    let id = req.body.idPlayer;
    let userid = await userSchema.findById(id)


    //reto.friends.push(friend._id);
    reto.players.push({ players: userid })

    res.send({
        reto,
    });
});
//app.post();
app.post("/register", async(req, res) => {
    let body = req.body;

    let email = body.email;
    let password = req.password;

    let newuser = userSchema.create({ email: email, password: password });
    console.log("");
});
app.post("/login", async(req, res) => {
    let body = req.body;
    let newuser = await userSchema.findOne(body).select(" -_id email password");
    //  newuser.DateUpload = Date.now();

    res.send({
        ok: true,
        newuser,
    });

    console.log(newuser);
});

app.get("/user", async(req, res) => {
    let user = await userSchema.find;
    res.send({
        ok: true,
        user,
    });
});

app.get("/user", async(req, res) => {
    let user = await userSchema.find;
    res.status(200).send({
        ok: true,
        user,
    });
});

app.post("/ranking", async(req, res) => {
    let ranking = await userSchema.find().sort({ points: -1 });

    if (!ranking) {
        return res.send({
            success: false,
            message: "no hay usuarios",
        });
    }

    res.send({ ranking });
});

app.post("/moviecreate", async(req, res) => {
    let body = req.body;
    let newmovie = new moviesSchema(body);

    await newmovie.save();

    res.send({
        ok: true,
        name: newmovie.name,
        id: newmovie.id,
    });

    console.log(`_id : "${id}"`);
});

app.post("/findmovie", async(req, res) => {
    let body = req.body;
    let movie = await moviesSchema.find({
        titele: body.titele.toLowerCase(),
        activate: true
    });
    res.send({
        ok: true,
        movie,
    });
    console.log(movie);

    //let moviesfind = await moviesSchema.findOne
});

app.get("/movies", async(req, res) => {
    let movies = await moviesSchema.find({ activate: true }).select("-_id -__v ");
    console.log(movies);
    res.send({
        ok: true,
        movies,
    });
});