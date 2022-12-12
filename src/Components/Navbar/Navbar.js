import React, { useState } from "react";
import Logo from "./geckologo.webp";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const nav = () => {
    if (term.trim().length !== 0) {
      navigate("/coin", {
        state: {
          id: term,
        },
      });
    } else {
      alert("input value is empty");
    }
  };

  return (
    <div className="nav">
      <Link to="/">
        <img src={Logo} alt="Logo" />
      </Link>

      <div className="search">
        <input
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          placeholder="Search your Token.."
          className="inputbar"
        />
        <button onClick={nav}>Search</button>
      </div>
    </div>
  );
}

export default Navbar;
