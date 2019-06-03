import React from "react";
import "./TimerHeader.css";
import { Link } from "react-router-dom";

const TimerHeader = () => (
  <div className="panel">
    <div className="row">
      <div className="four columns">
        <Link to="/" className="logo">
          <h2>PomodoroTimer</h2>
        </Link>
      </div>
      <div className="eight columns links-position">
        <ul className="nav-bar right">
          <li>
            <Link to="/log">Log</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default TimerHeader;
