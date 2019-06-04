import React, { Component } from "react";
import TimerHeader from "../TimerHeader/TimerHeader";
import TimerDisplay from "./TimerDisplay/TimerDisplay";
import TimerButtons from "./TimerButtons/TimerButtons";
import TimerSessions from "./TimerSessions/TimerSessions";
import "./Timer.css";
import * as timerStates from "../../timerStates";
import * as timerSessions from "../../timerSessions";
import helpers from "../../helpers";

import { setInterval, clearInterval } from "timers";

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timerSession: timerSessions.POMODORO,
      timerState: timerStates.NOT_SET,
      currentTime: "",
      pomodoroBaseTime: "",
      shortBreakBaseTime: "",
      longBreakBaseTime: "",
      timer: "",
      startTime: "",
      endTime: ""
    };

    this.startTimer = this.startTimer.bind(this);
    this.reduceTimer = this.reduceTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.pomodoroSession = this.pomodoroSession.bind(this);
    this.shortBreakSession = this.shortBreakSession.bind(this);
    this.longBreakSession = this.longBreakSession.bind(this);
  }

  componentWillMount() {
    // check if base times are set
    if (localStorage.length > 0) {
      const pomodoroBaseTime = new Date(
        localStorage.getItem("pomodoroBaseTime")
      );
      const shortBreakBaseTime = new Date(
        localStorage.getItem("shortBreakBaseTime")
      );
      const longBreakBaseTime = new Date(
        localStorage.getItem("longBreakBaseTime")
      );

      const currentTime = pomodoroBaseTime;

      this.setState({
        pomodoroBaseTime,
        shortBreakBaseTime,
        longBreakBaseTime,
        currentTime
      });

      // set base times
    } else {
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
        pomodoroBaseTime: dt1,
        shortBreakBaseTime: dt2,
        longBreakBaseTime: dt3,
        currentTime: dt1
      });
      // set to localStorage
      localStorage.setItem("pomodoroBaseTime", dt1);
      localStorage.setItem("shortBreakBaseTime", dt2);
      localStorage.setItem("longBreakBaseTime", dt3);
      localStorage.setItem("currentTime", dt1);
    }
    // set pomodoro session as default
    localStorage.setItem("timerSession", timerSessions.POMODORO);
  }

  componentWillUnmount() {
    // prevent memory leak
    clearInterval(this.state.timer);
  }
  // #################################################################################
  // ############################ Timer buttons ######################################
  // #################################################################################
  startTimer() {
    if (
      (this.state.currentTime.getMinutes() !== 0 &&
        this.state.currentTime.getSeconds() !== 0) ||
      this.state.currentTime.getMinutes() !== 0 ||
      this.state.currentTime.getSeconds() !== 0
    ) {
      //  starts initial pomodoro or continues previous stopped session
      this.launchTimer();
    }
  }

  reduceTimer() {
    if (
      this.state.currentTime.getMinutes() === 0 &&
      this.state.currentTime.getSeconds() === 0
    ) {
      this.completeTimer();
      return;
    }

    const newDt = new Date(this.state.currentTime);
    newDt.setSeconds(newDt.getSeconds() - 1);

    this.setState({
      currentTime: newDt
    });
    // set to localStorage
    localStorage.setItem("currentTime", newDt);
  }

  stopTimer() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }

    this.setState({
      timerState: timerStates.NOT_SET,
      currentTime: this.state.currentTime,
      timer: ""
    });
    // set to localStorage
    localStorage.setItem("timerState", timerStates.NOT_SET);
    localStorage.setItem("currentTime", this.state.currentTime);
  }

  resetTimer() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }

    if (this.state.timerSession === timerSessions.POMODORO) {
      this.setState({
        timerState: timerStates.NOT_SET,
        currentTime: this.state.pomodoroBaseTime,
        timer: ""
      });
      // set to localStorage
      localStorage.setItem("currentTime", this.state.pomodoroBaseTime);
    } else if (this.state.timerSession === timerSessions.SHORT_BREAK) {
      this.setState({
        timerState: timerStates.NOT_SET,
        currentTime: this.state.shortBreakBaseTime,
        timer: ""
      });
      // set to localStorage
      localStorage.setItem("currentTime", this.state.shortBreakBaseTime);
    } else {
      this.setState({
        timerState: timerStates.NOT_SET,
        currentTime: this.state.longBreakBaseTime,
        timer: ""
      });
      // set to localStorage
      localStorage.setItem("currentTime", this.state.longBreakBaseTime);
    }

    // start current session again
    this.launchTimer();
  }

  completeTimer() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }

    this.setState({
      timerState: timerStates.COMPLETE,
      timer: "",
      endTime: helpers.getCustomDate(new Date())
    });

    let logs = [];
    if (localStorage.getItem("logs")) {
      logs = JSON.parse(localStorage.getItem("logs"));
    }
    if (this.state.timerSession === timerSessions.POMODORO) {
      logs.push({
        session: "pomodoro",
        startTime: this.state.startTime,
        endTime: this.state.endTime
      });
    } else if (this.state.timerSession === timerSessions.SHORT_BREAK) {
      logs.push({
        session: "short_break",
        startTime: this.state.startTime,
        endTime: this.state.endTime
      });
    } else {
      logs.push({
        session: "long_break",
        startTime: this.state.startTime,
        endTime: this.state.endTime
      });
    }

    // ring the bell
    const audio = new Audio(
      "http://sfxcontent.s3.amazonaws.com/soundfx/BoxingBell.mp3"
    );
    audio.play();

    // set to localStorage
    localStorage.setItem("logs", JSON.stringify(logs));
    localStorage.setItem("timerState", timerStates.COMPLETE);
  }

  launchTimer() {
    this.setState({
      timerState: timerStates.RUNNING,
      timer: setInterval(this.reduceTimer, 1000),
      startTime: helpers.getCustomDate(new Date())
    });
    // set to localStorage
    localStorage.setItem("timerState", timerStates.RUNNING);
  }
  // #################################################################################
  // ############################ End Timer buttons ##################################
  // #################################################################################

  // #################################################################################
  // ############################ Session buttons ####################################
  // #################################################################################
  pomodoroSession() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }

    const pomodoroBaseTime = new Date(localStorage.getItem("pomodoroBaseTime"));

    this.setState({
      currentTime: pomodoroBaseTime,
      timerSession: timerSessions.POMODORO
    });
    // set to localStorage
    localStorage.setItem("currentTime", pomodoroBaseTime);
    localStorage.setItem("timerSession", timerSessions.POMODORO);

    // start pomodoro session
    this.launchTimer();
  }

  shortBreakSession() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }

    const shortBreakBaseTime = new Date(
      localStorage.getItem("shortBreakBaseTime")
    );

    this.setState({
      currentTime: shortBreakBaseTime,
      timerSession: timerSessions.SHORT_BREAK
    });
    // set to localStorage
    localStorage.setItem("currentTime", shortBreakBaseTime);
    localStorage.setItem("timerSession", timerSessions.SHORT_BREAK);

    // start short break session
    this.launchTimer();
  }

  longBreakSession() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }

    const longBreakBaseTime = new Date(
      localStorage.getItem("longBreakBaseTime")
    );
    this.setState({
      currentTime: longBreakBaseTime,
      timerSession: timerSessions.LONG_BREAK
    });
    // set to localStorage
    localStorage.setItem("currentTime", longBreakBaseTime);
    localStorage.setItem("timerSession", timerSessions.LONG_BREAK);

    // start long break session
    this.launchTimer();
  }
  // #################################################################################
  // ############################ End Session buttons ################################
  // #################################################################################

  render() {
    return (
      <div className="container-fluid">
        <TimerHeader />
        <TimerSessions
          pomodoroSession={this.pomodoroSession}
          shortBreakSession={this.shortBreakSession}
          longBreakSession={this.longBreakSession}
          timerSession={this.state.timerSession}
        />
        <TimerDisplay currentTime={this.state.currentTime} />
        <TimerButtons
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
          resetTimer={this.resetTimer}
          timerState={this.state.timerState}
        />
      </div>
    );
  }
}

export default Timer;
