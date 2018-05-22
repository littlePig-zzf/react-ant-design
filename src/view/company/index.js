import React, { Component } from 'react';
import { Table, Popconfirm } from 'antd';
import http from '../../service/index';
import { api } from '../../service/api';
import '../../mock';

class Company extends Component {
	state = {
		sortedInfo: null,
		bordered: true,
		loading: false,
		data: []
	};
 	handleChange = (pagination, filters, sorter) => {
	    console.log('Various parameters', pagination, filters, sorter);
	    this.setState({
	      filteredInfo: filters,
	      sortedInfo: sorter,
	    });
	};
	delFun = (key) => {
		console.log(key)
	};
	getData = () => {
		this.setState({loading: true});
		http(api.common.company, (res)=>{
			// console.log(res)
			this.setState(
				{data: res.data, loading: false}
			)
		}, (error)=>{

		})
	};
	componentWillMount() {
		this.getData()
	}
	componentDidMount() {

  	}	
  	render() {
	  	let { sortedInfo } = this.state;
	    sortedInfo = sortedInfo || {};

	  	const columns = [{
		  title: 'Name',
		  dataIndex: 'name',
		}, {
		  title: 'Age',
		  dataIndex: 'age',
		  key: 'age',
	      sorter: (a, b) => a.age - b.age,
	      sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
		}, {
		  title: 'Address',
		  dataIndex: 'address',
		},{ 
		  title: 'Action',
		  dataIndex: '',
		  render: (text, record) => {
		  	return (
			  	<Popconfirm title="Are you sure delete this task?" onConfirm={ () => this.delFun(record.key) } okText="Yes" cancelText="No">
				    <a>Delete</a>
				</Popconfirm>
			  )
		  }
		}];

		// const data = [];
		// for (let i = 0; i < 46; i++) {
		//   data.push({
		//     key: i,
		//     name: `Edward King ${i}`,
		//     age: `${i}`,
		//     address: `London, Park Lane no. ${i}`,
		//   });
		// }

		const rowSelection = {
		  onChange: (selectedRowKeys, selectedRows) => {
		    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		  }
		};

	    return (
	      <div className="container">
	          <h2 className="title">公司列表</h2>
	          <Table {...this.state} rowSelection={rowSelection} columns={columns} dataSource={this.state.data} onChange={this.handleChange}/>
	      </div>
	    );
	}
}

export default Company;
