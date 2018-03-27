import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; 
// import { browserHistory } from 'react-router'

class Layout extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
