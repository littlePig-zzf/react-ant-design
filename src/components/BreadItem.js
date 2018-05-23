import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link, browserHistory } from 'react-router';
import { getNavData } from '../common/nav';

export default class BreadItem extends Component {
	state = {
		data: []
	};
	componentWillMount() {
		this.getRouterFun();
	};
	getRouterFun() {
		let path = browserHistory.getCurrentLocation().hash;  //获取当前的路由
    	let curPath = path.substr(1, path.length-1);
    	console.log(curPath);
    	let res = [];
    	getNavData.forEach((item, index)=>{
    		if(item.children) {
		        item.children.forEach((cItem,cIndex)=>{
		          if(Object.is(cItem.path, curPath)){
		            res.push(item);
		            res.push(cItem);
		          }
		        })
		    }
		    else{
		        if(Object.is(item.path, curPath)){
		          res.push(item);
		        }
		    }
    	})
		this.setState({data: res})
	};
	itemRender = (route, params, routes, paths) => {
		const last = routes.indexOf(route) === routes.length - 1;
  		return last ? <span>{route.name}</span> : <Link to={paths.join('/')}>{route.name}</Link>;
	}
	render() {
		return (
			<Breadcrumb itemRender={this.itemRender} routes={this.state.data} />	
		)
	}
}

BreadItem.defaultProps = {
  data: [{name: 'ind0'}, {name: 'ddd'}]
};
