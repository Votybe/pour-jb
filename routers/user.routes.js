const express = require("express");
const router = express.Router();

const joueurController = require("../controllers/joueurs.controller");
const authentificationController = require("../controllers/authentification.controller");
const userController = require("../controllers/user.controller");

router.post("/signin", authentificationController.signin);
router.post("/login", authentificationController.login);
router.post("/add-favorite-player", joueurController.addPlayerToFavoris);
router.post(
  "/remove-favorite-player",
  joueurController.removePlayerFromFavoris
);

router.get("/get-favorite-players/:userId", joueurController.getPlayersByUser);
router.get(
  "/check-player-exist/:userId/:nomJoueur",
  joueurController.checkIfPlayerExist
);

router.get("/get-user/:id", userController.getUserById);
router.get("/get-all-users", userController.getAllUsers);
router.delete("/delete-all-users", userController.deleteAllUsers);

module.exports = router;
