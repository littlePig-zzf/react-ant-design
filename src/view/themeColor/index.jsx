import React, { Component } from 'react';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';

class themeColor extends Component {
  state = {
      themeColor: '#000'
  };
  changeHandler(res) {
    this.setState({
        themeColor: res.color
    })
    document.body.style.color = this.state.themeColor;
  }
  render() {
    return (
      <div className="container">
        <h4>自定义主题色</h4>
        <ColorPicker
          animation="slide-up"
          color={
            this.state.themeColor
          }
          onChange={this.changeHandler.bind(this)}
        />
      </div>
    );
  }
}

export default themeColor;
