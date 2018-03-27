import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import Login from './view/login';
import { Route, Router, hashHistory, IndexRoute } from 'react-router';
import registerServiceWorker from './registerServiceWorker';

// 路由配置
import MainIndex from './view/main/index';
import layout from './view/company/layout';
import companyIndex from './view/company/index';

const requireAuth = (replace) => {
   hashHistory.push('/Login')
   // this.context.router.push('/Login')
}

ReactDOM.render(
	(<Router history={hashHistory}>
		<Route path="/" onEnter={requireAuth} component={App} />
			<Route path="/Login" component={Login}/>
			<Route path="/MainIndex" component={MainIndex} />
				<IndexRoute component={companyIndex}/>  
				<Route path="/MainIndex/layout" component={layout} />
				<Route path="/MainIndex/companyIndex" component={companyIndex} />
  	</Router>),
   	document.getElementById('root'));

registerServiceWorker();
