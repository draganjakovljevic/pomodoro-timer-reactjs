import React from "react";
import "./TimerDisplay.css";

const leftPad = val => {
  if (val < 10) return `0${val}`;

  return `${val}`;
};

const TimerDisplay = props => (
  <div className="row">
    <div className="twelve columns text-center">
      <h1>
        {`${leftPad(props.currentTime.getMinutes())}:${leftPad(
          props.currentTime.getSeconds()
        )}`}
      </h1>
    </div>
  </div>
);

export default TimerDisplay;
