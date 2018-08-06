import React, { Component } from 'react';
import { Button, Select } from "antd";
import "rc-color-picker/assets/index.css";
import ColorPicker from "rc-color-picker";
import "./index.css"
import draw from "./canvas"
const ButtonGroup = Button.Group;
const Option = Select.Option;

let canvasFrame = ''
class canvas extends Component {
  state = {
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
    defaultLineWidth: "2px",
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
    console.log(canvasFrame);
    this.setState({
      lineColor: obj.color
    });
  }
  render() {
    const strokeOptions = this.state.strokeWidth.map(item => (
      <Option key={item}>{item}px</Option>
    ));
    const buttonItem = this.state.paintTool.map(item => (
      <Button key={item.id} id={item.id} className={ this.state.curSelect === item.id ? 'active': ''} icon={item.icon} onClick={
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
          <div className="paint-tool" id="select">
            <ButtonGroup>
                {buttonItem}
            </ButtonGroup>
            <label className="stroke-width">
              笔触宽度：
              <input
                id="lineWidth"
                placeholder={this.state.defaultLineWidth}
                type="number"
                style={{ display: "none" }}
              />
              <Select
                defaultValue={this.state.defaultLineWidth}
                onSelect={this.changeLineWidth.bind(this)}
                style={{ width: 120 }}
              >
                {strokeOptions}
              </Select>
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
              width="1000"
              height="500"
              style={{ border: "1px solid #eee" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default canvas;
