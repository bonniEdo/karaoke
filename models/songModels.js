const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    url: { type: String, required: true },
    language: { type: String, required: true }
}
)

module.exports = mongoose.model("Song", songSchema);