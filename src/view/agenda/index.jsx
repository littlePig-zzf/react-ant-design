import React, { Component } from "react";
import { findIndex } from 'lodash'
import { Steps, Button, DatePicker, Modal, Input } from "antd";
import "./index.css";

const Step = Steps.Step;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

class agenda extends Component {
  state = {
    schedule: [
      { year: '2018',
        children: [
          { date: "2018-05-10", des: "和朋友出去聚会" },
          { date: "2018-06-20", des: "吃一顿大餐" }
        ]
      }
    ],
    mode: ["month", "month"],
    rangeDate: [],
    showModal: false,
    currentStep: 0,
    newDate: "",
    newDes: ""
  };

  showModal = () => {
    this.setState({
      showModal: true
    });
  };

  compareDate(date, schedule) {
    const newYear = String(new Date(date).getFullYear());
    const newItem = { date: date, des: this.state.newDes };
    for(let i = 0; i<schedule.length; i++) {
      if (newYear === schedule[i].year) {
        console.log("1");
        schedule[i].children.push(newItem);
        return false;
      } else if (newYear > schedule[i].year) {
        console.log("2");
        schedule.push({ year: newYear, children: [newItem] });
        return false
      } else if (newYear < schedule[i].year) {
        schedule.splice(0, 0, newItem);
        return false;
      }
    }
    // schedule.forEach((item)=>{
      
    // })
    
    schedule.forEach((item)=>{
      if (item.year !== newYear) return
      item.children.sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      });
    })

    console.log(schedule);
  };

  setCurrentStep() {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    const today = `${year}-${month}-${day}`;

    const dateArr = JSON.parse(JSON.stringify(this.state.schedule));

    this.compareDate(today, dateArr);
    dateArr.forEach((item)=>{
      const cur = findIndex(item.children, { date: today });
      if (cur > 0) {
        this.setState({ currentStep: cur - 1 });
        return
      }
    })
  };

  handleOk = e => {
    this.compareDate(this.state.newDate, this.state.schedule);
    this.setCurrentStep();
    this.setState({
      showModal: false
    });
  };

  handleCancel = e => {
    console.log('-=-=-');
    
    this.setState({
      showModal: false,
      newDate: "",
      newDes: ""
    });
  };

  handlePanelChange = (value, mode) => {
    this.setState({
      rangeDate: value,
      mode: [
        mode[0] === "date" ? "month" : mode[0],
        mode[1] === "date" ? "month" : mode[1]
      ]
    });
  };

  render() {
    const { rangeDate, mode } = this.state;
    return (
      <div className="container agendaBox">
        <h3>记录日程</h3>
        <label>时间筛选：</label>
        <RangePicker
          placeholder={["Start month", "End month"]}
          format="YYYY-MM"
          value={rangeDate}
          mode={mode}
          onPanelChange={this.handlePanelChange}
        />
        <div className="progressCont">
          {
            this.state.schedule.map((item,index)=>{
              return (
                <div key={index+'s'} style={{ display: 'inline-block', verticalAlign: 'top' }}>
                  <h4>{item.year}</h4>
                  <Steps
                    current={this.state.currentStep}
                    progressDot
                    direction="vertical">
                    {this.state.schedule[index].children.map((cItem, cIndex) => {
                      return <Step title={cItem.date} description={cItem.des} key={cIndex} />;
                    })}
                  </Steps>
                </div>
              )
            })
          }
          <Button
            style={{ marginTop: 10 }}
            type="primary"
            icon="plus"
            size="small"
            onClick={() => {
              console.log('[][][][');
              
              this.setState({
                showModal: true,
                newDate: "",
                newDes: "" });
            }}
          >
            增加日程
          </Button>
        </div>

        <Modal
          title="增加日程"
          visible={this.state.showModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <div>
            时间：
            <DatePicker
              onChange={(date, dateString) => {
                this.setState({ newDate: dateString });
              }}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            日程：
            <TextArea
              rows={4}
              style={{ width: "80%", verticalAlign: "top" }}
              onChange={e => {
                const { value } = e.target;
                this.setState({ newDes: value });
              }}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default agenda;
