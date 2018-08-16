import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { withRouter, Link } from "react-router-dom";
import { getNavData } from "../common/nav";

export default class BreadItem extends Component {
	state = {
		routes: []
	};
	// itemRender = (route, params, routes, paths) => {
		// return route.name ? <Breadcrumb.Item key={route.name}>{route.name}</Breadcrumb.Item> : ''
		// const last = routes.indexOf(route) === routes.length - 1;
		// let breadItem = last ? <span>{route.name}</span> : route.name ? <Link to={paths.join('/')}>{route.name}</Link> : '';
		// return breadItem
	// }
	render() {
		const Home = withRouter((props) => {
			const { location } = props;
			const pathSnippets = location.pathname.split("/").filter(i => i);
			// console.log("pathSnippets", location);
			
			const extraBreadcrumbItems = pathSnippets.map((_, index) => {
				const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
				// console.log('url',url);
				
				return (
					<Breadcrumb.Item key={url}>
						<Link to={url}>
							{
								getNavData.map((item) => {
									// console.log(item);
									let res = ''
									if (item.path === url) {
										res = item.name
									} else if (item.children) {
										item.children.map((cItem)=>{
											if (cItem.path === url) {
												res = cItem.name
											}
											return res
										})
									}
									
									return res
								})
							}
						</Link>
					</Breadcrumb.Item>
				);
				
			});
			return <Breadcrumb style={{ margin: '0 0 10px' }}>{extraBreadcrumbItems}</Breadcrumb>	
		})
		
		return (
			<Home />
		)
	}
}

BreadItem.defaultProps = {
  routes: [{name: 'ind0'}, {name: 'ddd'}],
  params: []
};
