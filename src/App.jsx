import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './App.css';
import './common/global.js'

class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <div className="App" ref="app">
          {this.props.children}
        </div>
      </LocaleProvider>
    );
  }
}

export default App;
