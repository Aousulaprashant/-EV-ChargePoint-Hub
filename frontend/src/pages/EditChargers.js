// src/pages/AddEditCharger.js
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import "../styles/AddEditCharger.css"; // import CSS
import imgH from "../IMG/ev.png";
export default function AddEditCharger() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [charger, setCharger] = useState({
    name: "",
    location: { latitude: "", longitude: "" },
    status: "Active",
    powerOutput: "",
    connectorType: "",
  });

  const powerOptions = ["3.3", "7.2", "11", "22", "50", "100"]; // in kW
  const connectorOptions = ["Type1", "Type2", "CHAdeMO", "CCS", "GB/T"];

  useEffect(() => {
    if (id) {
      axios.get("/chargers").then((res) => {
        const found = res.data.find((c) => c._id === id);
        if (found) setCharger(found);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...charger,
      location: {
        latitude: charger.location.latitude,
        longitude: charger.location.longitude,
      },
    };
    if (id) await axios.put(`/chargers/${id}`, data);
    else await axios.post("/chargers", data);
    navigate("/chargers");
  };

  return (
    <div className="outer-edit">
      <Navbar />
      <div className="add-edit-container">
        <div className="dm">
          <img className="iconEV" src={imgH} alt="" />{" "}
          <h2 className="form-title">{id ? "Edit" : "Add"} Charger</h2>
        </div>

        <form className="charger-form" onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="text"
            placeholder="Name"
            value={charger.name}
            onChange={(e) => setCharger({ ...charger, name: e.target.value })}
            required
          />
          <input
            className="input-field"
            type="text"
            placeholder="Latitude"
            value={charger.location.latitude}
            onChange={(e) =>
              setCharger({
                ...charger,
                location: { ...charger.location, latitude: e.target.value },
              })
            }
            required
          />
          <input
            className="input-field"
            type="text"
            placeholder="Longitude"
            value={charger.location.longitude}
            onChange={(e) =>
              setCharger({
                ...charger,
                location: { ...charger.location, longitude: e.target.value },
              })
            }
            required
          />
          <select
            className="select-field"
            value={charger.powerOutput}
            onChange={(e) =>
              setCharger({ ...charger, powerOutput: e.target.value })
            }
            required
          >
            <option value="">Select Power Output (kW)</option>
            {powerOptions.map((p) => (
              <option key={p} value={p}>
                {p} kW
              </option>
            ))}
          </select>

          <select
            className="select-field"
            value={charger.connectorType}
            onChange={(e) =>
              setCharger({ ...charger, connectorType: e.target.value })
            }
            required
          >
            <option value="">Select Connector Type</option>
            {connectorOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            className="select-field"
            value={charger.status}
            onChange={(e) => setCharger({ ...charger, status: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
