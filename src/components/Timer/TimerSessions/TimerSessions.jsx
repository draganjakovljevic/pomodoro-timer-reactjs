import React, { Component } from "react";
import "./TimerSessions.css";
import * as timerSessions from "../../../timerSessions";

class TimerSessions extends Component {
  render() {
    let pomodoroActiveClass = "";
    let shortActiveClass = "";
    let longActiveClass = "";

    if (this.props.timerSession === timerSessions.POMODORO) {
      pomodoroActiveClass = " active";
    } else if (this.props.timerSession === timerSessions.SHORT_BREAK) {
      shortActiveClass = " active";
    } else {
      longActiveClass = " active";
    }

    return (
      <div>
        <div className="row">
          <div className="ten columns centered">
            <ul className="button-group">
              <li>
                <button
                  className={"button" + pomodoroActiveClass}
                  id="pomodoroBtn"
                  type="submit"
                  value="Pomodoro"
                  onClick={this.props.pomodoroSession}
                >
                  Pomodoro
                </button>
              </li>
              <li>
                <button
                  className={"button" + shortActiveClass}
                  id="shortBreakBtn"
                  type="submit"
                  value="Short Break"
                  onClick={this.props.shortBreakSession}
                >
                  Short Break
                </button>
              </li>
              <li>
                <button
                  className={"button" + longActiveClass}
                  id="longBreakBtn"
                  type="submit"
                  value="Long Break"
                  onClick={this.props.longBreakSession}
                >
                  Long Break
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default TimerSessions;
