const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieShema = Schema({
    titele: { type: String, require: true },
    subtitele: { type: String, require: false },
    director: { type: String, require: true },
    premiereage: { type: Number },
    thumb: { type: String },
    budget: { type: Number, defaut: 300 },
    duration: { type: String, require: true },
    trailerurl: { type: String, require: true },
    actors: { type: String },
});
module.exports = mongoose.model("Movie", movieShema);