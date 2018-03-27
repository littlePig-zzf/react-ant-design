import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import Login from './view/login';
import { Route, Router, hashHistory } from 'react-router';
import registerServiceWorker from './registerServiceWorker';

// 路由配置
import MainIndex from './view/main/index';
import CompanyIndex from './view/company/index';
import UserIndex from './view/user/index';
import StoreIndex from './view/store/index';

let routes = <Route path="/" component={App} >
				<Route path="/Login" component={Login}/>
				<Route path="/MainIndex" component={MainIndex} >
					<Route path="companyIndex" component={CompanyIndex} />
					<Route path="userIndex" component={UserIndex} />
					<Route path="storeIndex" component={StoreIndex} />
				</Route>
			</Route>

ReactDOM.render((
	<Router history={hashHistory} routes={routes} />
  	), document.getElementById('root'));

registerServiceWorker();
