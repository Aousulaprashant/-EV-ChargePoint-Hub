const ChargingStation = require("../Models/chargingStation.model");

const createCharger = async (req, res) => {
  try {
    const { name, location, status, powerOutput, connectorType } = req.body;

    // Basic input validation
    if (
      !name ||
      !location ||
      !location.latitude ||
      !location.longitude ||
      !status ||
      !powerOutput ||
      !connectorType
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const charger = await ChargingStation.create({
      name,
      location,
      status,
      powerOutput,
      connectorType,
      createdBy: req.user._id,
    });

    res.status(201).json(charger);
  } catch (err) {
    console.error("Create Charger Error:", err.message);
    res.status(500).json({ message: "Server error while creating charger" });
  }
};

const getChargers = async (req, res) => {
  try {
    const { status, powerOutput, connectorType } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (powerOutput) filter.powerOutput = Number(powerOutput);
    if (connectorType) filter.connectorType = connectorType;

    const chargers = await ChargingStation.find(filter);
    res.status(200).json(chargers);
  } catch (err) {
    console.error("Get Chargers Error:", err.message);
    res.status(500).json({ message: "Server error while fetching chargers" });
  }
};

const updateCharger = async (req, res) => {
  try {
    const updated = await ChargingStation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Charger not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Charger Error:", err.message);
    res.status(500).json({ message: "Server error while updating charger" });
  }
};

const deleteCharger = async (req, res) => {
  try {
    const deleted = await ChargingStation.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Charger not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete Charger Error:", err.message);
    res.status(500).json({ message: "Server error while deleting charger" });
  }
};

module.exports = { deleteCharger, updateCharger, getChargers, createCharger };
