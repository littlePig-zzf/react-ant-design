import React, { Component } from 'react';
import './App.scss';
// import { Link } from 'react-router-dom'; 
// import { browserHistory } from 'react-router'
import './common/global.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default App;
