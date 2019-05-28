import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToken, setUserName } from '../../actions';
import './index.scss';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
  state = {
    loading: false,
    token: '',
    userName: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        this.setState({
          loading: false
        });
        return;
      }

      try {
        const res = await global.$api.login(values);
        console.log(res, 'res');
        this.setState({ loading: false });

        this.props.dispatch(setToken(res.token));
        this.props.dispatch(setUserName(res.data.userName));
        if (res.code !== 200) {
          message.error(res.data.msg);
          return;
        }
        this.props.history.push('/main/index');
      } catch (error) {
        console.error(error);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-box">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <span className="login-form-forgot" href="">
              Forgot password
            </span>
            <Button
              type="primary"
              loading={this.state.loading}
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <span>register now!</span>
          </FormItem>
        </Form>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(Login);

export default connect()(WrappedNormalLoginForm);
