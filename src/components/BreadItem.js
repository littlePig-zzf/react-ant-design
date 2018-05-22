import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link, browserHistory } from 'react-router';
import { getNavData } from '../common/nav';

export default class BreadItem extends Component {
	state = {
		data: []
	};
	componentWillMount() {
		let path = browserHistory.getCurrentLocation().hash;  //获取当前的路由
    	let curPath = path.substr(1, path.length-1);
    	console.log(curPath);
    	let res = [];
    	getNavData.forEach((index, item)=>{
    		if(item.children) {
		        item.children.forEach((cItem,cIndex)=>{
		          if(Object.is(cItem.path, curPath)){
		            // console.log(item)
		            console.log(cItem)
		            res.push(item);
		            res.push(cItem);
			    	// this.setState({data: res})
		          }
		        })
		    }
		    else{
		        if(Object.is(item.path, curPath)){
		          // this.setState({  //使用setState修改state数据之后，并不能在这里直接打印最新的state的值，因为修改了之后还会执行一遍willUpdate
		          //   curSelectKey: [index.toString()]
		          // // })
		          console.log('item')
		          console.log(item)
		          res.push(item);
		        }
		    }
    	})
		this.setState({data: res})
    	console.log('this.state.data')
    	console.log(res)
	};
	itemRender = (route, params, routes, paths) => {
		// console.log(paths)
		const last = routes.indexOf(route) === routes.length - 1;
  		return last ? <span>{route.name}</span> : <Link to={paths.join('/')}>{route.name}</Link>;
	}
	render() {
		return (
			<Breadcrumb itemRender={this.itemRender} routes={getNavData} />	
		)
	}
}

BreadItem.defaultProps = {
  data: [{name: 'ind0'}, {name: 'ddd'}]
};
