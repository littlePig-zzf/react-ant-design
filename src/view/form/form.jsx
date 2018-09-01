import React, { Component } from 'react';
import { Form, Input, Radio, Button, Select, Checkbox, Row, Col } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

const brands = [["a", "b", "c", "f"], ["34", "35", "36", "37"], ["-1", "-2", "-3", "-4"]];

class RegistrationForm extends Component {
  state = {
    currentBrand: []
  };
  validateWord = ({field}, value, callback) => {
    const num = field === "productName" ? 60 : 300;
    if (value && value.length > num) {
      callback(`请输入${num}字以内的字数，当前字数为${value.length}`);
    }
    callback();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  }
  handleSelect(val) {
    this.setState({ currentBrand: brands[val] });
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 18,
          offset: 6
        }
      }
    };
    
    return (
      <div className="formBox container">
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label={<span>商品类型：</span>}>
            {getFieldDecorator("productTypes", {
              rules: [
                {
                  required: true,
                  message: "请选择商品类型!",
                  whitespace: true,
                  type: "number"
                }
              ]
            })(
              <Select
                style={{ width: 200 }}
                onChange={this.handleSelect.bind(this)}
              >
                <Option value={0}>精品</Option>
                <Option value={1}>生活品</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>商品品牌：</span>}>
            {getFieldDecorator("productBrand", {
              rules: [
                {
                  required: true,
                  message: "请选择商品品牌!",
                  whitespace: true,
                  type: "number"
                }
              ]
            })(
              <Select style={{ width: 200 }}>
                {this.state.currentBrand.map((item, index) => {
                  return (
                    <Option key={index} value={index}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>商品名称：</span>}>
            {getFieldDecorator("productName", {
              rules: [
                {
                  required: true,
                  message: "请输入商品名称!"
                },
                {
                  validator: this.validateWord
                }
              ]
            })(<Input type="text" />)}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>商品简介：</span>}>
            {getFieldDecorator("productIntro", {
              rules: [
                {
                  required: true,
                  message: "请输入商品简介!"
                },
                {
                  validator: this.validateWord
                }
              ]
            })(<TextArea rows={4} />)}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>商品标签定义：</span>}>
            {getFieldDecorator("productTag", {
              rules: [
                {
                  required: true,
                  message: "请输入选择商品标签!"
                }
              ]
            })(
              <Checkbox.Group style={{ width: "100%", paddingTop: 9 }}>
                <Row>
                  <Col span={3}>
                    <Checkbox value="A">标签A</Checkbox>
                  </Col>
                  <Col span={3}>
                    <Checkbox value="B">标签B</Checkbox>
                  </Col>
                  <Col span={3}>
                    <Checkbox value="C">标签C</Checkbox>
                  </Col>
                  <Col span={3}>
                    <Checkbox value="D">标签D</Checkbox>
                  </Col>
                  <Col span={3}>
                    <Checkbox value="E">标签E</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>商品编码：</span>}>
            {getFieldDecorator("productNum", {
              initialValue: "446564656456456"
            })(<Input type="text" />)}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>计量单位：</span>}>
            {getFieldDecorator("unit", {
              rules: [
                {
                  required: true,
                  message: "请输入正确的计量单位（仅限数字）!",
                  whitespace: true,
                  pattern: /^[1-9]|0.[1-9]$/
                },
                {
                  validator: this.validateUnit
                }
              ]
            })(<Input style={{ width: "30%" }} />)}
            &nbsp; /元
          </FormItem>
          <FormItem {...formItemLayout} label={<span>商品状态：</span>}>
            {getFieldDecorator("productStatus", {
              initialValue: 1
            })(
              <RadioGroup>
                <Radio value={1}>出售中</Radio>
                <Radio value={2}>已下架</Radio>
                <Radio value={3}>仓库中</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              type="default"
              onClick={this.handleReset}
            >
              重置
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;
