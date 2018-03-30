import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Button, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;



class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }
  handleReset = () => {
  	this.props.form.resetFields();
  }
  render() {
  	const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 18,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
    return (
      <div className="formBox container">
      	<Form onSubmit={this.handleSubmit}>
	      	<FormItem
	          {...formItemLayout}
	          label={(
	            <span>
	              Nickname&nbsp;
	              <Tooltip title="What do you want others to call you?">
	                <Icon type="question-circle-o" />
	              </Tooltip>
	            </span>
	          )}
	        >
	          {getFieldDecorator('username', {
	            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
	          })(
	            <Input />
	          )}
	        </FormItem>
	        <FormItem
	          {...formItemLayout}
	          label="Password"
	        >
	          {getFieldDecorator('password', {
	            rules: [{
	              required: true, message: 'Please input your password!',
	            }, {
	              validator: this.validateToNextPassword,
	            }],
	          })(
	            <Input type="password" />
	          )}
	        </FormItem>
	        <FormItem
	          {...formItemLayout}
	          label="Confirm Password"
	        >
	          {getFieldDecorator('confirm', {
	            rules: [{
	              required: true, message: 'Please confirm your password!',
	            }, {
	              validator: this.compareToFirstPassword,
	            }],
	          })(
	            <Input type="password" onBlur={this.handleConfirmBlur} />
	          )}
	        </FormItem>
	        <FormItem
	          {...formItemLayout}
	          label="Phone Number"
	        >
	          {getFieldDecorator('mobile', {
	            rules: [{ required: true, message: 'Please input your phone number!' }],
	          })(
	            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
	          )}
	        </FormItem>
	        <FormItem {...tailFormItemLayout}>
	          <Button type="primary" htmlType="submit">Register</Button>
	          <Button style={{ marginLeft: '10px' }} type="default" onClick={this.handleReset}>Reset</Button>
	        </FormItem>
	      </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;
