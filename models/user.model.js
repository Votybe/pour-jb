const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  joueursFavoris: [
    {
      nom: {
        type: String,
        required: false,
      },
      club: {
        type: String,
        required: false,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
