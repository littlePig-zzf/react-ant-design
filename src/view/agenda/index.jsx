import React, { Component } from "react";
import { findIndex } from 'lodash'
import { Steps, Button, DatePicker, Modal, Input } from "antd";
import "./index.css";

const Step = Steps.Step;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

class agenda extends Component {
  state = {
    schedule: [],
    filterSchedule: [],
    showModal: false,
    newDate: "",
    newDes: ""
  };

  showModal = () => {
    this.setState({
      showModal: true
    });
  };

  compareDate(date, schedule) {
    const { today: newDay, year: newYear} = this.dealDate(date);
    const newItem = { date: date, des: this.state.newDes, currentStep: null };
    const equal = findIndex(schedule, { year: newYear });
    if (equal < 0) {
      schedule.push({ year: newYear, children: [newItem] });
    } else {
      schedule[equal].children.forEach(item => {
        if (item.date === String(newDay)) {
          item.des += `、${this.state.newDes}`;
        } else {
          schedule[equal].children.push(newItem);
        }
        return;
      });
    }
    schedule.sort((a, b) => {
      return a.year > b.year ? 1 : -1;
    });
    schedule.forEach(item => {
      if (item.year !== newYear) return;
      item.children.sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      });
    });
  }

  dealDate(time) {
    const date = time ? new Date(time) : new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    const today = `${year}-${month}-${day}`;
    return {year: String(year), today: today}
  }

  setCurrentStep() {
    const { year, today } = this.dealDate();

    const dateArr = JSON.parse(JSON.stringify(this.state.schedule));
    const curElement = this.state.schedule;

    this.compareDate(today, dateArr);
    dateArr.forEach((item, index) => {
      const cur = findIndex(item.children, { date: today });
      if (cur > 0 && item.year === year) {
        curElement[index].currentStep = cur - 1;
      } else if (item.year > year) {
        curElement[index].currentStep = null;
      } else {
        const { length } = curElement[index].children;
        curElement[index].currentStep = length;
      }
      this.setState({ schedule: curElement });
      return;
    });
  }

  handleOk = e => {
    this.compareDate(this.state.newDate, this.state.schedule);
    this.setCurrentStep();
    this.setState({
      showModal: false
    });
  };

  handleCancel = e => {
    this.setState({
      showModal: false,
      newDate: "",
      newDes: ""
    });
  };

  handlePanelChange = (value) => {
    if (value.length === 0) {
      this.setState({ schedule: this.state.rawSchedule });
      return
    }
    const { year: startYear, today: startDate } = this.dealDate(value[0]);
    const { year: endYear, today: endDate } = this.dealDate(value[1]);
    
    let res = JSON.parse(JSON.stringify(this.state.schedule))
    res = res.filter(item => item.year >= startYear && item.year <= endYear );
    res.forEach(item => {
      item.children = item.children.filter(cItem => {
        return cItem.date >= startDate && cItem.date <= endDate
      });
    })
    
    this.setState({ rawSchedule: JSON.parse(JSON.stringify(this.state.schedule)), schedule: res });
  };

  render() {
    return <div className="container agendaBox">
        <h3>记录日程</h3>
        <label>时间筛选：</label>
        <RangePicker placeholder={["开始日期", "结束日期"]} format="YYYY-MM-DD" onChange={this.handlePanelChange} />
        <div className="progressCont">
          {this.state.schedule.length === 0 ? <p style={{ color: "#999" }}>
            赶紧修饰你的日程表吧！yeah！
            </p> : this.state.schedule.map((item, index) => {
              return <div key={index + "s"} style={{ display: "inline-block", verticalAlign: "top" }}>
                  <h4>{item.year}</h4>
                  {this.state.schedule[index].children.length > 0 ? '' : <p style={{marginRight: 20}}>暂无数据~</p>}
                  <Steps current={item.currentStep} progressDot direction="vertical">
                    {this.state.schedule[index].children.map(
                        (cItem, cIndex) => {
                          return (
                            <Step
                              title={cItem.date}
                              description={cItem.des}
                              key={cIndex}
                            />
                          );
                        }
                      )}
                  </Steps>
                </div>;
            })}
          <Button style={{ marginTop: 10 }} type="primary" icon="plus" size="small" onClick={() => {
              this.setState({ showModal: true });
            }}>
            增加日程
          </Button>
        </div>

        <Modal title="增加日程" destroyOnClose visible={this.state.showModal} onOk={this.handleOk} onCancel={this.handleCancel}>
          <div>
            时间：
            <DatePicker onChange={(date, dateString) => {
                this.setState({ newDate: dateString });
              }} />
          </div>
          <div style={{ marginTop: 20 }}>
            日程：
            <TextArea ref="textarea" rows={4} style={{ width: "80%", verticalAlign: "top" }} onChange={e => {
              this.setState({ newDes: e.target.value });
              }} />
          </div>
        </Modal>
      </div>;
  }
}

export default agenda;
