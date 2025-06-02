const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoutes = require("./Routes/user.routes.js");
const chargerRoutes = require("./Routes/chargingStation.routes.js");
const cors = require("cors");
dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/chargers", chargerRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});
// error handlers
// app.use(notFound);
// app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
