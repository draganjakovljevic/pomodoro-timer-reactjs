import React, { Component } from "react";
import TimerHeader from "../TimerHeader/TimerHeader";
import "./TimerSettings.css";

class TimerSettings extends Component {
  constructor() {
    super();

    this.state = {
      pomodoroMinutes: "",
      shortBreakMinutes: "",
      longBreakMinutes: ""
    };

    this.saveSettings = this.saveSettings.bind(this);
    this.resetSettings = this.resetSettings.bind(this);
    this.pomodoroHandleChange = this.pomodoroHandleChange.bind(this);
    this.shortBreakHandleChange = this.shortBreakHandleChange.bind(this);
    this.longBreakHandleChange = this.longBreakHandleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      pomodoroMinutes: new Date(
        localStorage.getItem("pomodoroBaseTime")
      ).getMinutes(),
      shortBreakMinutes: new Date(
        localStorage.getItem("shortBreakBaseTime")
      ).getMinutes(),
      longBreakMinutes: new Date(
        localStorage.getItem("longBreakBaseTime")
      ).getMinutes()
    });
  }

  saveSettings() {
    const dt1 = new Date();
    dt1.setHours(0);
    dt1.setMinutes(this.state.pomodoroMinutes);
    dt1.setSeconds(0);

    const dt2 = new Date();
    dt2.setHours(0);
    dt2.setMinutes(this.state.shortBreakMinutes);
    dt2.setSeconds(0);

    const dt3 = new Date();
    dt3.setHours(0);
    dt3.setMinutes(this.state.longBreakMinutes);
    dt3.setSeconds(0);

    // set to localStorage
    localStorage.setItem("pomodoroBaseTime", dt1);
    localStorage.setItem("shortBreakBaseTime", dt2);
    localStorage.setItem("longBreakBaseTime", dt3);

    localStorage.setItem("currentTime", dt1);

    this.props.history.push("/");
  }

  resetSettings() {
    const dt1 = new Date();
    dt1.setHours(0);
    dt1.setMinutes(25);
    dt1.setSeconds(0);

    const dt2 = new Date();
    dt2.setHours(0);
    dt2.setMinutes(5);
    dt2.setSeconds(0);

    const dt3 = new Date();
    dt3.setHours(0);
    dt3.setMinutes(15);
    dt3.setSeconds(0);

    this.setState({
      pomodoroMinutes: dt1.getMinutes(),
      shortBreakMinutes: dt2.getMinutes(),
      longBreakMinutes: dt3.getMinutes()
    });

    // set to localStorage
    localStorage.setItem("pomodoroBaseTime", dt1);
    localStorage.setItem("shortBreakBaseTime", dt2);
    localStorage.setItem("longBreakBaseTime", dt3);
    localStorage.setItem("currentTime", dt1);
  }

  pomodoroHandleChange(e) {
    this.setState({ pomodoroMinutes: e.target.value });
  }

  shortBreakHandleChange(e) {
    this.setState({ shortBreakMinutes: e.target.value });
  }

  longBreakHandleChange(e) {
    this.setState({ longBreakMinutes: e.target.value });
  }

  render() {
    return (
      <div>
        <TimerHeader />
        <div className="text-center">
          <h3>
            Set Custom Times <small>(in minutes)</small>
          </h3>
          <div className="row">
            <div className="four columns">
              <label className="left">Pomodoro</label>
              <input
                type="number"
                step="1"
                min="1"
                max="59"
                name="time_pomodoro"
                value={this.state.pomodoroMinutes}
                onChange={this.pomodoroHandleChange}
              />
            </div>
            <div className="four columns">
              <label className="left">Short Break</label>
              <input
                type="number"
                step="1"
                min="1"
                max="59"
                name="time_shortbreak"
                value={this.state.shortBreakMinutes}
                onChange={this.shortBreakHandleChange}
              />
            </div>
            <div className="four columns">
              <label className="left">Long Break</label>
              <input
                type="number"
                step="1"
                min="1"
                max="59"
                name="time_longbreak"
                value={this.state.longBreakMinutes}
                onChange={this.longBreakHandleChange}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <button
              className="radius button left save-btn"
              id="saveSettings"
              type="submit"
              value="Save"
              onClick={this.saveSettings}
            >
              Save
            </button>
            <button
              className="radius button left reset-btn"
              id="resetSettings"
              type="submit"
              value="Reset"
              onClick={this.resetSettings}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default TimerSettings;
