const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");

router.get("/api/leaderboard", apiController.leaderboard);
router.post("/api/updatescore", apiController.newScore);

router.delete("/api/removescore/:id", apiController.deletePlayer);

module.exports = router;
