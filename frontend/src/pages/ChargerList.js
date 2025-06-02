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

  return (
    <div className="charger-list-page">
      <Navbar />
      <div className="container">
        <h2 className="page-title">
          <img className="iconEV" src={imgH} alt="" />
          <>Charging Stations</>
        </h2>
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
