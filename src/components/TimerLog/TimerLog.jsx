import React, { Component } from "react";
import TimerHeader from "../TimerHeader/TimerHeader";
import "./TimerLog.css";

class TimerLog extends Component {
  constructor() {
    super();

    this.logs = [];
  }

  componentWillMount() {
    this.logs = JSON.parse(localStorage.getItem("logs"));
  }

  render() {
    return (
      <div>
        <TimerHeader />
        <div className="time-log-table">
          <table>
            <tbody>
              <tr>
                <th>Session</th>
                <th>Start time</th>
                <th>End time</th>
              </tr>
              {this.logs ? (
                this.logs.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td key={`${index}-1st-col`}>{item.session}</td>
                      <td key={`${index}-2nd-col`}>{item.startTime}</td>
                      <td key={`${index}-3th-col`}>{item.endTime}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3">No sessions available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TimerLog;
