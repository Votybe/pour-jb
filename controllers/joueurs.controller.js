const User = require("../models/user.model");

const addPlayerToFavoris = async (req, res) => {
  const { userId, nomJoueur, clubJoueur } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    user.joueursFavoris.push({ nom: nomJoueur, club: clubJoueur });
    await user.save();

    res.send({ message: "Player added to favorites." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error." });
  }
};

const removePlayerFromFavoris = async (req, res) => {
  const { userId, playerName, club } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Supprime le joueur du tableau joueursFavoris
    user.joueursFavoris.pull({ nom: playerName, club: club });
    await user.save();

    res.send({ message: "Player removed from favorites." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error.", error });
  }
};

const getPlayersByUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    res.send({ data: user.joueursFavoris });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error." });
  }
};
const checkIfPlayerExist = async (req, res) => {
  const { userId, nomJoueur } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const player = user.joueursFavoris.find(
      (joueur) => joueur.nom === nomJoueur
    );

    if (!player) {
      return res.status(404).send({ message: "Player not found." });
    }

    res.send({ data: player });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error." });
  }
};

module.exports = {
  addPlayerToFavoris,
  removePlayerFromFavoris,
  getPlayersByUser,
  checkIfPlayerExist,
};
