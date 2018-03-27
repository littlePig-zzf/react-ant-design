import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Company extends Component {
  gotoFun() {
    browserHistory.push('/Login')
  }
  render() {
    return (
      <div>
          公司列表
      </div>
    );
  }
}

export default Company;
