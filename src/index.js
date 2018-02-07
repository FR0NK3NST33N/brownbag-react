import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    MemoryRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'

import Nav from './components/nav'
import Home from './views/home.js'
import Test from './views/test'

class Sijl extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/test" component={Test} />
                        <Redirect to="/" />
                    </Switch>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<Sijl />, document.getElementById('sijl'));