import React, { Component } from "react";
import * as timerStates from "../../../timerStates";

import "./TimerButtons.css";

class TimerButtons extends Component {
  constructor() {
    super();

    this.getStartButton = this.getStartButton.bind(this);
  }

  getStartButton() {
    if (
      this.props.timerState === timerStates.NOT_SET ||
      this.props.timerState === timerStates.COMPLETE
    )
      return (
        <button
          className="success radius large button"
          id="timerStart"
          type="submit"
          value="Start"
          onClick={this.props.startTimer}
        >
          Start
        </button>
      );

    if (this.props.timerState === timerStates.RUNNING)
      return (
        <button
          className="success radius large button"
          id="timerStart"
          type="submit"
          value="Start"
          onClick={this.props.startTimer}
          disabled
        >
          Start
        </button>
      );
  }
  render() {
    return (
      <div className="row">
        <div className="six columns centered">
          <div className="four columns">{this.getStartButton()}</div>
          <div className="four columns">
            <button
              className="alert radius large button"
              id="timerPause"
              type="submit"
              value="Stop"
              onClick={this.props.stopTimer}
            >
              Stop
            </button>
          </div>
          <div className="four columns">
            <button
              className="radius large secondary button"
              id="timerReset"
              type="submit"
              value="Reset"
              onClick={this.props.resetTimer}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TimerButtons;
