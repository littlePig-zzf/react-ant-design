import React, { Component } from 'react';
import { Card, Row, Col, Icon } from 'antd';
import './index.scss';

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
		]
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

		</div>
      </div>
    );
  }
}

export default manage;