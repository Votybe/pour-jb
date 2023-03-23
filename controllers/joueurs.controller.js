const Joueur = require("../models/joueur.model");
const User = require("../models/user.model");

const addPlayerToFavoris = async (req, res) => {
  const { userId, playerName } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Find the player by name
    const player = await Player.findOne({ name: playerName });

    if (!player) {
      return res.status(404).send({ message: "Player not found." });
    }

    // Add the player to the user's favorite players array
    user.joueursFavoris.push(playerName);
    await user.save();

    res.send({ message: "Player added to favorites." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error." });
  }
};

const removePlayerFromFavoris = async (req, res) => {
  async (req, res) => {
    const { userId, playerName } = req.body;

    try {
      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      // Remove the player from the user's favorite players array
      const index = user.joueursFavoris.indexOf(playerName);
      if (index > -1) {
        user.joueursFavoris.splice(index, 1);
        await user.save();
      } else {
        return res
          .status(404)
          .send({ message: "Player not found in favorites." });
      }

      res.send({ message: "Player removed from favorites." });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error." });
    }
  };
};

const getPlayersByUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const players = await Joueur.find({
      name: { $in: user.joueursFavoris },
    });

    res.send({ data: players });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error." });
  }
};

module.exports = {
  addPlayerToFavoris,
  removePlayerFromFavoris,
  getPlayersByUser,
};
