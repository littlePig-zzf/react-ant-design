import React, { Component } from 'react';
import { Form, Input, Modal, Table, Popconfirm, Button } from 'antd';

class TableArea extends Component {
  state = {
    sortedInfo: null,
    bordered: true,
    loading: false,
    showModal: false,
    data: [],
    note: ''
  };
  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };
  delFun = key => {
    const { data } = this.state;
    delete data[key];
    this.setState({
      data: data
    });
  };
  getData = async () => {
    this.setState({ loading: true });
    try {
      const res = await global.$api.company();
      this.setState({ data: res.data, loading: false });
    } catch (error) {
      console.error(error);
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  setModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
    if (!this.state.showModal) {
      this.props.form.resetFields();
    }
  };

  componentWillMount() {
    this.getData();
  }

  render() {
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const { getFieldDecorator } = this.props.form;

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name'
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order
      },
      {
        title: 'Address',
        dataIndex: 'address'
      },
      {
        title: 'Action',
        dataIndex: '',
        render: (text, record) => {
          return (
            <div>
              <Popconfirm
                title="Are you sure delete this task?"
                onConfirm={() => this.delFun(record.key)}
                okText="Yes"
                cancelText="No"
              >
                <Button style={{ marginRight: '10px' }}>Delete</Button>
              </Popconfirm>
              <Button type="primary" onClick={this.setModal.bind(this)}>
                Add
              </Button>
            </div>
          );
        }
      }
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows
        );
      }
    };

    const modalProp = {
      title: 'Add a item',
      visible: this.state.showModal,
      onOk: () => {
        this.setModal();
      },
      onCancel: () => {
        this.setModal();
      }
    };

    return (
      <div className="container">
        <Table
          {...this.state}
          id="table-to-xls"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.data}
          onChange={this.handleChange}
        />
        <Modal {...modalProp}>
          <Form
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            onSubmit={this.handleSubmit}
          >
            <Form.Item label="Note">
              {getFieldDecorator('note', {
                rules: [{ required: true, message: 'Please input your note!' }]
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
const WrappedNormalTableForm = Form.create()(TableArea);

export default WrappedNormalTableForm;
