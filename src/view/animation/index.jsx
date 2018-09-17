import React, { Component } from 'react';
import { Slider } from "antd";
import './index.css'

let circle = ''
let len = 0
class SvgFrame extends Component {
  state = {
    percent: 20
  }
  componentDidMount() {
    circle = this.refs.path
    len = 2 * Math.PI * circle.getAttribute('r')
    circle.style.strokeDasharray = len;
    circle.style.strokeDashoffset = len * .9;
    circle.style.transition = "stroke-dashoffset .3s ease-in-out";
  }
  changeValue(value) {
      this.setState({
        percent: value
      })
      const range_value = this.state.percent
      const val = len - (range_value / 100) * len;
      circle.style.strokeDashoffset = value === 100 ? 0 : val; //取消自带的strokeDashoffset
  }
  render() {
    return <div className="container">
        <div className="animation_item">
          <h4>svg进度条</h4>
          <div className="svgContainer" data-pct={this.state.percent}>
            <svg x="0" y="0" width="200" height="200" viewBox="0 0 200 200" className="svgFrame">
              <circle stroke="#f1f1f1" fill="none" strokeWidth="5" cx="100" cy="100" r="80" strokeDashoffset="0" />
              <circle ref="path" className="path" stroke="#91d5ff" fill="none" strokeWidth="10" strokeDashoffset="0" cx="100" cy="100" r="80" />
            </svg>
            <Slider defaultValue={this.state.percent} tipFormatter={value => {
              return `${value}%`;
            }} onChange={this.changeValue.bind(this)} />
          </div>
        </div>

        <div className="animation_item">
          <h4>弹跳动画</h4>
          <div className="bounceAnimation">
            <div className="square red"></div>
            <div className="square blue"></div>
            <div className="square green"></div>
          </div>
        </div>
      </div>;
  }
}

export default SvgFrame;
