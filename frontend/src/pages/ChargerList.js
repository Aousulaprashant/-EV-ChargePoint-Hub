// src/pages/ChargerList.js
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/chargerList.css";
import imgH from "../IMG/ev.png";

export default function ChargerList() {
  const [chargers, setChargers] = useState([]);

  useEffect(() => {
    axios.get("/chargers").then((res) => setChargers(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`/chargers/${id}`);
      setChargers(chargers.filter((c) => c._id !== id));
    }
  };

  const [filters, setFilters] = useState({
    status: "",
    powerOutput: "",
    connectorType: "",
  });

  useEffect(() => {
    const fetchChargers = async () => {
      const query = new URLSearchParams();

      if (filters.status) query.append("status", filters.status);
      if (filters.powerOutput) query.append("powerOutput", filters.powerOutput);
      if (filters.connectorType)
        query.append("connectorType", filters.connectorType);

      const res = await axios.get(`/chargers?${query.toString()}`);
      setChargers(res.data);
    };

    fetchChargers();
  }, [filters]);

  return (
    <div className="charger-list-page">
      <Navbar />
      <div className="container">
        <div className="container-header">
          <h2 className="page-title">
            <img className="iconEV" src={imgH} alt="" />
            <>Charging Stations</>
          </h2>
          <div className="filters">
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select
              value={filters.powerOutput}
              onChange={(e) =>
                setFilters({ ...filters, powerOutput: e.target.value })
              }
            >
              <option value="">All Power Outputs</option>
              <option value="3.3">3.3 kW</option>
              <option value="7.2">7.2 kW</option>
              <option value="11">11 kW</option>
              <option value="22">22 kW</option>
              <option value="50">50 kW</option>
              <option value="100">100 kW</option>
            </select>
            <select
              value={filters.connectorType}
              onChange={(e) =>
                setFilters({ ...filters, connectorType: e.target.value })
              }
            >
              <option value="">All Connectors</option>
              <option value="Type1">Type1</option>
              <option value="Type2">Type2</option>
              <option value="CCS">CCS</option>
              <option value="CHAdeMO">CHAdeMO</option>

              <option value="GB/T">GB/T</option>
            </select>
          </div>
        </div>
        {chargers.length === 0 ? (
          <p className="no-chargers">No charging stations available.</p>
        ) : (
          <ul className="charger-list">
            {chargers.map((c) => (
              <li key={c._id} className="charger-item">
                <div className="charger-info">
                  <span className="charger-name">{c.name}</span>
                  <span
                    className={`charger-status status-${c.status.toLowerCase()}`}
                  >
                    {c.status === "Active" ? (
                      <>
                        <span
                          className="status-icon"
                          role="img"
                          aria-label="active"
                        >
                          🟢
                        </span>{" "}
                        {c.status}
                      </>
                    ) : (
                      <>
                        <span
                          className="status-icon"
                          role="img"
                          aria-label="inactive"
                        >
                          🔴
                        </span>{" "}
                        {c.status}
                      </>
                    )}
                  </span>
                  <span className="charger-connector">{c.connectorType}</span>
                </div>

                <div className="charger-actions">
                  <Link to={`/chargers/${c._id}`} className="btn btn-edit">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
