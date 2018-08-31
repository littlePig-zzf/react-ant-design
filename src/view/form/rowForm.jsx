import React, { Component } from 'react';
import { Input, Button, message } from 'antd';
import ReactDOM from 'react-dom';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  handleChange = ({target: {value}}) => {
    this.setState({
      username: value
    })
  }

  handleSubmit = e => {
    if(this.state.username === '') {
      message.error('请填写下面输入框')
      ReactDOM.findDOMNode(this.refs.user).focus();
      return
    }
    message.success('账户名为： ' + this.state.username);
    e.preventDefault();
  }

  render() {
    let InputWidth = {
      width: '200px',
      border: '1px solid #eee',
      margin: '0 10px'
    };
    return (
      <div className="formBox container">
      	<form onSubmit={this.handleSubmit}>
          <label>
            name:
            <Input ref="user" style={InputWidth} placeholder="Basic usage" onKeyUp={ this.handleChange }/>
          </label>
          <label>
            job:
            <Input ref = "job" style = {InputWidth} placeholder = "请填写你从事的职业" onKeyUp = { this.handleChange }/>
          </label>
          <Button type="primary" htmlType="submit">提交</Button>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
