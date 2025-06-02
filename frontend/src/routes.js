// src/routes.js
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChargerList from "./pages/ChargerList";
import AddEditCharger from "./pages/EditChargers";
import MapView from "./pages/MapView";
import PrivateRoute from "./components/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path="/chargers" element={<ChargerList />} />
        <Route path="/chargers/new" element={<AddEditCharger />} />
        <Route path="/chargers/:id" element={<AddEditCharger />} />
        <Route path="/map" element={<MapView />} />
      </Route>
    </Routes>
  );
}
