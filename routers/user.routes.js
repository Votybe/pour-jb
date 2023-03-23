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

router.get("/get-favorite-players", joueurController.getFavoritePlayers);
router.get("/check-player-exist", joueurController.checkifPlayerExist);

module.exports = router;
