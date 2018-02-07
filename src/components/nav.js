import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Nav extends Component {
    render() {
        return (
            <div>
                <Link to={"/"}><button>Home</button></Link>
                <Link to={"/test"}><button>Test</button></Link>
            </div>
        );
    }
}

export default Nav;