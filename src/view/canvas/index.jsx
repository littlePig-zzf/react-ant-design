import React, { Component } from 'react';
import { Button, Slider } from "antd";
import "rc-color-picker/assets/index.css";
import ColorPicker from "rc-color-picker";
import "./index.css"
import draw from "./canvas.js"
const ButtonGroup = Button.Group;
// const Option = Select.Option;

let canvasFrame = ''
class canvas extends Component {
  state = {
    canvasWidth: 1100,
    canvasHeight: 500,
    paintTool: [
      { id: "pen", icon: "edit", txt: '铅笔' },
      { id: "line", icon: "minus", txt: '直线' },
      { id: "rect", icon: "scan", txt: '矩形' },
      { id: "arc", icon: "dribbble", txt: '圆形' },
      { id: "robber", icon: "reload", txt: '橡皮擦' },
      { id: "img", icon: "picture", txt: '图片' },
      { id: "save", icon: "save", txt: '保存' },
      { id: "new", icon: "sync", txt: '新建' },
    ],
    strokeWidth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    defaultLineWidth: 2,
    lineColor: "#000",
    curSelect: "pen"
  };
  componentDidMount() {
    canvasFrame = new draw();
    canvasFrame.init();
  }
  changeLineWidth(value) {
    this.setState({
      defaultLineWidth: value
    });
  }
  changeColorHandler(obj) {
    this.setState({
      lineColor: obj.color
    });
  }
  render() {
    const buttonItem = this.state.paintTool.map(item => (
      <Button key={item.id} id={item.id} className={this.state.curSelect === item.id ? 'active': ''} icon={item.icon} onClick={
        () => {
          this.setState({
            curSelect: item.id
          })
        }
      }>
        {item.txt}
      </Button>
    ));
    return (
      <div className="container">
        <h4>开启你的涂鸦之路！</h4>
        <div className="canvas-box">
          <div className="paint-tool">
            <ButtonGroup id="select">
                {buttonItem}
            </ButtonGroup>
            <label className="stroke-width">
              {this.state.curSelect === 'robber' ? '橡皮擦宽度' : '笔触宽度'}：
              <input
                id="lineWidth"
                placeholder={this.state.defaultLineWidth}
                type="number"
                style={{ display: "none" }}
              />
              <Slider defaultValue={this.state.defaultLineWidth} tipFormatter={
                (value) => {
                  return `${value}px`
                }
              } style={{ width: 200, display: 'inline-block', verticalAlign: 'middle', marginTop: 10 }} onChange={this.changeLineWidth.bind(this)}/>
            </label>
            <label className="stroke-width">
              笔触颜色：
              <ColorPicker
                animation="slide-up"
                color={this.state.lineColor}
                onChange={this.changeColorHandler.bind(this)}
              />
              <input
                type="text"
                id="color"
                placeholder={this.state.lineColor}
                style={{ display: "none" }}
              />
            </label>
            <input
              type="file"
              id="file"
              name="img"
              style={{ display: "none" }}
            />
          </div>

          <div className="canvas-con">
            <canvas
              id="penal"
              width={this.state.canvasWidth}
              height={this.state.canvasHeight}
              style={{ border: "1px solid #eee" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default canvas;
