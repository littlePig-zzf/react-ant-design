import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import { Form, Input, Modal, Button } from 'antd';
import SharedGroup from './sortableList.jsx';
import './index.scss';

class transform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      dataResource: [
        { title: '需求', data: [] },
        { title: '处理中', data: [] },
        { title: '已完成', data: [] }
      ]
    };
  }
  addDemand() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { dataResource } = this.state;
        dataResource[0].data.push(values.demand);
        this.setState({
          dataResource
        });
        this.addDemand();
        this.props.form.resetFields();
      }
    });
  };
  delete(fatherIndex, index) {
    const { dataResource } = this.state;
    dataResource[fatherIndex].data.splice(index, 1);
    this.setState({
      dataResource
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const modalProp = {
      title: 'Add a demand',
      visible: this.state.showModal,
      footer: null
    };
    return (
      <div className="container transform">
        <p>
          <Button type="primary" onClick={this.addDemand.bind(this)}>
            新增需求
          </Button>
        </p>
        <div className="transform-cont">
          {this.state.dataResource.map((item, index) => {
            return (
              <SharedGroup
                key={uniqueId()}
                index={index}
                title={item.title}
                items={item.data}
                delete={this.delete.bind(this)}
              />
            );
          })}
        </div>
        <Modal {...modalProp}>
          <Form
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            onSubmit={this.handleSubmit}
          >
            <Form.Item label="需求">
              {getFieldDecorator('demand', {
                rules: [
                  { required: true, message: 'Please input your demand!' }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
const transformModule = Form.create()(transform);
export default transformModule;
