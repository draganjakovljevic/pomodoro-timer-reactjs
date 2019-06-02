import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TimerSettings from './components/TimerSettings/TimerSettings';
import TimerLog from './components/TimerLog/TimerLog';

import { Route, BrowserRouter as Router } from 'react-router-dom'

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/settings" component={TimerSettings} />
            <Route path="/log" component={TimerLog} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
