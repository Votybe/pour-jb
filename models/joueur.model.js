const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  club: {
    type: String,
    required: true,
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
