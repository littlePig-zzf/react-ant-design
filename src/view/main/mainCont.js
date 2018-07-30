import React, { Component } from 'react';
import { Card, Row, Col, Icon } from 'antd';
import './index.scss';

import TabFrame from "../../components/TabFrame";

class manage extends Component {
	state = {
		cardData: [
			{
				icon: 'file-excel',
				txt: '4352345',
				className: 'fileIcon'
			},
			{
				icon: 'file-excel',
				txt: '4352345',
				className: 'fileIcon'
			},
			{
				icon: 'file-excel',
				txt: '4352345',
				className: 'fileIcon'
			},
			{
				icon: 'file-excel',
				txt: '4352345',
				className: 'fileIcon'
			}
		],
		echartBg: '#d0545f',
		carData: ['宝马', '奔驰', '法拉第', '奥迪', '大众', '本田', '一汽'],
		carSellerData: [12, 56, 20, 52, 10, 5, 45]
	}
  render() {
    return (
      <div>
      	<div className="main-header">
		    <Row gutter={16}>
			      {
			      	this.state.cardData.map((item,index)=>{
			      		return (
					      	<Col className="gutter-row" span={6} key={index}>
	      			 			<Card bordered={false} hoverable className={item.className}>
					        		<Icon type={item.icon} />
					        		<span className="cardTxt">
					        			{item.txt}
					        		</span>
			        			</Card>
			        	 	</Col>
		      			)
			      	})
			      }
		    </Row>
			</div>
			<div className="main-cont">
				<Row gutter = {24}>
					<Col span = {12} >
						< TabFrame echartWidth = "chart-item" title = "司机排名统计" / >
					</Col>
					<Col span = {12}>
						< TabFrame echartWidth = "chart-item" yAxisData = {this.state.carSellerData} xAxisData = {this.state.carData} echartBg = {this.state.echartBg} title = "车辆信息排名" / >
					</Col>
				</Row>
			</div>
    </div>
    );
  }
}

export default manage;