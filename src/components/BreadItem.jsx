import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
// import { Link } from 'react-router';

export default class BreadItem extends Component {
	state = {
		routes: []
	};
	itemRender = (route, params, routes, paths) => {
		return route.name ? <span>{route.name}</span> : ''
		// const last = routes.indexOf(route) === routes.length - 1;
		// let breadItem = last ? <span>{route.name}</span> : route.name ? <Link to={paths.join('/')}>{route.name}</Link> : '';
		// return breadItem
	}
	render() {
		return (
			<Breadcrumb style={{ margin: '0 0 10px'}} itemRender={this.itemRender} routes={this.props.routes} params={this.props.params} />	
		)
	}
}

BreadItem.defaultProps = {
  routes: [{name: 'ind0'}, {name: 'ddd'}],
  params: []
};
