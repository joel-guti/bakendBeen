const mongoose = require("mongoose");
const ramdom = require("mongoose-simple-random");

const Schema = mongoose.Schema;
// MIRAR CON PAPA LO DE LOS ALEATORIOS

const triviaslSchema = Schema({
    question: { type: String, require: true },
    type: { type: String, default: "BackendBeen" },
    ansews: [{ type: String }],
    activate: { type: Boolean, require: true },
    lastPlay: { type: Number, default: Date.now() },
    correct: { type: Number },
    movie: { type: Schema.Types.ObjectId, ref: "Movie" },
    //deal: {},
    deals: [{ type: Schema.Types.ObjectId, ref: 'Deal' }]
});

triviaslSchema.plugin(ramdom);
module.exports = mongoose.model("Trivial", triviaslSchema);