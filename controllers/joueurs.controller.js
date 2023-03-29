const User = require("../models/user.model");

const addPlayerToFavoris = async (req, res) => {
  const { userId, nomJoueur } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    user.joueursFavoris.push({ nom: nomJoueur });
    await user.save();

    if (user.joueursFavoris.includes(nomJoueur)) {
      return res.status(400).send({ message: "Player already in favorites." });
    }
    console.log(userId);

    res.send({ message: "Player added to favorites." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error." });
  }
};

const removePlayerFromFavoris = async (req, res) => {
  const { userId, playerName } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Supprime le joueur du tableau joueursFavoris
    user.joueursFavoris.pull({ nom: playerName });
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
