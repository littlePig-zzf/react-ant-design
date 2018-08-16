import React, { Component } from 'react';

class form extends Component {
  render() {
    return (
      <div>
          {this.props.children}
      </div>
    );
  }
}

export default form;
