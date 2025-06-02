const express = require("express");
const Authmiddleware = require("../middlewares/auth.middleware.js");
const {
  createCharger,
  getChargers,
  updateCharger,
  deleteCharger,
} = require("../controllers/chargingStation.controller.js");
const { protect } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/", Authmiddleware, createCharger);
router.get("/", Authmiddleware, getChargers);
router.put("/:id", Authmiddleware, updateCharger);
router.delete("/:id", Authmiddleware, deleteCharger);

module.exports = router;
