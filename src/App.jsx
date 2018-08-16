import React, { Component } from 'react';
import './App.scss';
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
