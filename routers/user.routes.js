const router = require("express").Router();

const joueurController = require("../controllers/joueurs.controller");
const authentificationController = require("../controllers/authentification.controller");

router.post("/signin", authentificationController.signin);
router.post("/login", authentificationController.login);

router.post("/add-favorite-player", joueurController.addPlayerToFavoris);
router.post(
  "/remove-favorite-player",
  joueurController.removePlayerFromFavoris
);

module.exports = router;
