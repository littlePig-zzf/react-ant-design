import React, { Component } from 'react';
import { Card, Row, Col, Icon } from 'antd';
import './index.css';

class manage extends Component {
  render() {
    return (
      <div className="main-header">
	    <Row gutter={16}>
	      <Col className="gutter-row" span={6}>
	        <Card bordered={false}>
		        <Icon type="file-excel" />
	        </Card>
	      </Col>
	      <Col className="gutter-row" span={6}>
	        <div className="gutter-box">col-6</div>
	      </Col>
	      <Col className="gutter-row" span={6}>
	        <div className="gutter-box">col-6</div>
	      </Col>
	      <Col className="gutter-row" span={6}>
	        <div className="gutter-box">col-6</div>
	      </Col>
	    </Row>
	  </div>
    );
  }
}

export default manage;
