// src/pages/MapView.js
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import chargingStation from "../IMG/charging-station.png";
import L from "leaflet";
import Navbar from "../components/Navbar";
import "../styles/MapView.css"; // import CSS

export default function MapView() {
  const [chargers, setChargers] = useState([]);

  useEffect(() => {
    axios.get("/chargers").then((res) => setChargers(res.data));
  }, []);

  const customIcon = new L.Icon({
    iconUrl: chargingStation,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <>
      <Navbar />
      <div className="mapview-container">
        <h2 className="mapview-title">Map View</h2>
        <p className="msg">Click on the Icon for More</p>
        <div className="map-wrapper">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            className="map-container"
            scrollWheelZoom={true}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {chargers.map((c) => (
              <Marker
                key={c._id}
                position={[c.location.latitude, c.location.longitude]}
                icon={customIcon}
              >
                <Popup>
                  <div className="popup-content">
                    <strong>{c.name}</strong> - {c.status} <br />
                    Power: {c.powerOutput} kW <br />
                    Connector: {c.connectorType}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </>
  );
}
