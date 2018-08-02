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
import Manage from './view/manage/index';
import UserIndex from './view/manage/user';
import RoleIndex from './view/manage/role';
import PermitIndex from './view/manage/permit';
import StoreIndex from './view/store/index';
import FormIndex from './view/form/index';
import Form from './view/form/form';
import RowForm from './view/form/rowForm';
import EditorIndex from './view/editor/index'

import errorPage from './view/errorPage/index'; //找不到路由

let routes = <Route path="/" component={App} >
				<IndexRedirect to="/Login" />
				<Route path="/Login" component={Login}/>
				<Route path="/MainIndex" component={MainIndex} >
					<Route path="companyIndex" component={CompanyIndex} />
					<Route path="Manage" component={Manage}>
						<Route path="UserIndex" component={UserIndex} />
						<Route path="RoleIndex" component={RoleIndex} />
						<Route path="permitIndex" component={PermitIndex} />
					</Route>
					<Route path="storeIndex" component={StoreIndex} />
					<Route path="formIndex" component={FormIndex} >
						<Route path="Form" component={Form} />
						<Route path="RowForm" component={RowForm} />
					</Route>
					<Route path="editorIndex" component={EditorIndex}></Route>
				</Route>
				<Route path="*" component={errorPage}/>
			</Route>

ReactDOM.render((
	<Router history={hashHistory} routes={routes} />
  	), document.getElementById('root'));

registerServiceWorker();



