// src/components/Navbar.js
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import "../styles/navBar.css";
import { BsEvStation } from "react-icons/bs";
import { LuMapPin } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import logo from "../IMG/ev2.png";
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="nav-links">
        <div className="LogoDash">
          <img src={logo} alt="/" />
          <h2> ChargePoint Hub</h2>
        </div>

        <Link to="/chargers" className="nav-link AddEv">
          Home
        </Link>
        <Link to="/chargers/new" className="nav-link AddEv">
          Add{" "}
          <div className="Ev">
            <BsEvStation size={19} />
          </div>
        </Link>
        <Link to="/map" className="nav-link AddEv">
          Map
          <div className="Ev">
            <LuMapPin />
          </div>
        </Link>
      </div>
      <button
        className="btn-logout"
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        <FiLogOut style={{ marginRight: "8px" }} />
        Logout
      </button>
    </nav>
  );
}
