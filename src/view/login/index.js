import React, { Component } from 'react';
import './index.css';
import { hashHistory } from 'react-router';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;

class Login extends Component {

  state = {
  	loading: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading: true})
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        global.$http(global.$api.common.index, values, (res)=>{
        	console.log(res)
        	this.setState({loading: false})
        	if (res.code !== 200) {
						message.error(res.data)
        	} else {
		        hashHistory.push('/MainIndex')
        	}
        }, (error)=>{
        	console.log(error)
        })
      } else {
				this.setState({
					loading: false
				})
			}
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
	      <div className="login-box">
	      	<Form onSubmit={this.handleSubmit} className="login-form">
		        <FormItem>
		          {getFieldDecorator('userName', {
		            rules: [{ required: true, message: 'Please input your username!' }],
		          })(
		            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
		          )}
		        </FormItem>
		        <FormItem>
		          {getFieldDecorator('password', {
		            rules: [{ required: true, message: 'Please input your Password!' }],
		          })(
		            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
		          )}
		        </FormItem>
		        <FormItem>
		          {getFieldDecorator('remember', {
		            valuePropName: 'checked',
		            initialValue: true,
		          })(
		            <Checkbox>Remember me</Checkbox>
		          )}
		          <a className="login-form-forgot" href="">Forgot password</a>
		          <Button type="primary" loading={this.state.loading} htmlType="submit" className="login-form-button">
		            Log in
		          </Button>
		          Or <a href="">register now!</a>
		        </FormItem>
		      </Form>
	      </div>
		);
	}
}
const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm;
