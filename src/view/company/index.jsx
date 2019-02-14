import React, { Component } from 'react';
import { Table, Popconfirm } from 'antd';

class Company extends Component {
	state = {
		sortedInfo: null,
		bordered: true,
		loading: false,
		data: []
	};
 	handleChange = (pagination, filters, sorter) => {
	    this.setState({
	      filteredInfo: filters,
	      sortedInfo: sorter,
	    });
	};
	delFun = (key) => {
		const { data } = this.state;
		delete data[key];
		this.setState({
			data: data
		})
	};
	getData = async () => {
		this.setState({loading: true});
		try {
			const res = await global.$api.company()
			this.setState(
				{data: res.data, loading: false}
			)
		} catch (error) {
			console.error(error);
		}
	};
	
	componentWillMount() {
		this.getData()
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
