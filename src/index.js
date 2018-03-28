import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';

import App from './App';
import Login from './view/login';
import { Route, Router, hashHistory, IndexRedirect } from 'react-router';
import registerServiceWorker from './registerServiceWorker';

// 路由配置
import MainIndex from './view/main/index';
import CompanyIndex from './view/company/index';
import manage from './view/manage/index';
import UserIndex from './view/manage/user';
import RoleIndex from './view/manage/role';
import permitIndex from './view/manage/permit';
import StoreIndex from './view/store/index';

import errorPage from './view/errorPage/index'; //找不到路由


const requireFun = (nextState,replace)=>{

}

let routes = <Route path="/" onEnter={requireFun} component={App} >
				<IndexRedirect to="/Login" />
				<Route path="/Login" component={Login}/>
				<Route path="/MainIndex" component={MainIndex} >
					<Route path="companyIndex" component={CompanyIndex} />
					<Route path="Manage" component={manage}>
						<Route path="UserIndex" component={UserIndex} />
						<Route path="RoleIndex" component={RoleIndex} />
						<Route path="permitIndex" component={permitIndex} />
					</Route>
					<Route path="storeIndex" component={StoreIndex} />
				</Route>
				<Route path="*" component={errorPage}/>
			</Route>

ReactDOM.render((
	<Router history={hashHistory} routes={routes} />
  	), document.getElementById('root'));

registerServiceWorker();



