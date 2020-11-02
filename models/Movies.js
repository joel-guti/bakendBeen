const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ramdom = require("mongoose-simple-random");

const movieShema = Schema({
    titele: { type: String, require: true },
    subtitele: { type: String, require: false },
    director: { type: String, require: true },
    premiere: { type: Number, default: Date.now() },
    thumb: { type: String },
    activate: { type: Boolean, default: true },
    budget: { type: Number, defaut: 300 },
    duration: { type: String, require: true },
    trailerurl: { type: String, require: true },
    actors: { type: String },
});
movieShema.plugin(ramdom);
module.exports = mongoose.model("Movie", movieShema);