const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    powerOutput: { type: Number, required: true }, // kW
    connectorType: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const chargingStationModel = mongoose.model("ChargingStation", stationSchema);

module.exports = chargingStationModel;
