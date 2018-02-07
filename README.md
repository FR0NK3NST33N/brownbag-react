# Setup

- First we need to install all the the necessary node modules
    - `npm init`
    - `npm install react react-dom react-router-dom`
    - `npm install babel-core babel-loader babel-preset-env babel-preset-react css-loader extract-text-webpack-plugin file-loader node-sass raw-loader sass-loader style-loader url-loader webpack webpack-dev-server --save-dev`
- start setting up project structure
    - `touch index.html`
    - `mkdir src`
    - `mkdir config`
    - `touch .babelrc`
    - `cd config && touch webpack.config.js`
    - `cd src && touch index.js`
- add `console.log("Hello, world!")` to `src/index.js`
- copy this into `webpack.config.js`:
```
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: {
      'dist/app' : './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '..'),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      { 
          test: /\.js|\.jsx/, 
          use: [ 
            { 
                loader: 'babel-loader',
                options: {
                    presets: ['react']
                }
            }
          ]
      }, 
      {
          test: /\.css$/,
          use: [
              {
                  loader: 'style-loader'
              },
              {
                  loader: 'css-loader',
                  options: {
                    modules: true
                  }
              }
          ]
      },
      {
            test: /\.scss$/,
            exclude:  /node_modules/,
            use: [
                {
                    loader: "style-loader"
                },
                {
                    loader: "css-loader"
                },
                {
                    loader: "sass-loader"
                }
            ]
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        use: 'url-loader?limit=1000000&name=assets/images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name]")
  ],
  watch: true
};

module.exports = config;
```
- walk through webpack config
- add this to .babelrc:
```
{
    "presets": [
        ["env", {
                "targets": {
                    "browsers": ["last 3 versions", "safari >= 7"],
                    "node": "6.10"
                }
            }]
        ]
}
```
-- set up build scripts in package.json
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config ./config/webpack.config.js",
    "serve": "webpack-dev-server --port 2000 --inline --hot --host 0.0.0.0 --config ./config/webpack.config.js"
},
```
-- set up index.html
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>React SIJL</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  </head>
  <body>
    <app id="sijl"></app>
    <script src="./dist/app.bundle.js"></script>
  </body>
</html>
```

- run using `npm run serve`
    - open localhost:2000 in browser and view console to see `Hello, world!`

- start setting up index.js with:
```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    MemoryRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'

class Sijl extends Component {
    render() {
        return (
            <h1>Hello, World!</h1>
        );
    }
}

ReactDOM.render(<Sijl />, document.getElementById('sijl'));
```

- we've just build our first component

- so how do we set up variables for a component?

- modify index like so:
```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    MemoryRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'

class Sijl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Home"
        };
    }
    render() {
        return (
            <h1>{this.state.title}</h1>
        );
    }
}

ReactDOM.render(<Sijl />, document.getElementById('sijl'));
```

- Now that weve seen how variables work and are rendered in a component, lets set up our router

- first we need to create som view components and a nav component
- In `src/`
    - `mkdir components`
    - `mkdir views`
- In `src/components/`
    - `touch nav.js`
    - `touch nav.scss`
- In `src/views/`
    - `touch home.js`
    - `touch home.scss`
    - `touch test.js`
    - `touch test.scss`

- build nav.js first since we will be inserting that component above our router component
```
import React, { Component } from 'react';

class Nav extends Component {
    render() {
        return (
            <div>
                <button>Home</button>
                <button>Test</button>
            </div>
        );
    }
}

export default Nav;
```

- import the nav component into our index file and add to our sijl component
```
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

class Sijl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Home"
        };
    }
    render() {
        return (
            <div>
                <Nav />
                <h1>{this.state.title}</h1>
            </div>
        );
    }
}

ReactDOM.render(<Sijl />, document.getElementById('sijl'));
```

- Now lets set up our basic views
    - copy nav.js contents into both home.js and test.js
    - Replace names where need
    - example:
```
import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    }
}

export default Home;
```

- import both of our view into index.js and lets set up our router
```
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
import Home from './views/home'
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
```

- now all we should need to do is set up our links
    - back in nav.js we need to `import { Link } from 'react-router-dom'`
    - we then need to wrap our buttons in `<Link>` tags:
```
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
``` 

- can add styles if time permits
