import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

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
import themeColor from './view/themeColor/index'
import canvas from './view/canvas/index'
import svg from './view/svg/index'

import errorPage from './view/errorPage/index'; //找不到路由

let routes = <Route path="/" component={App}>
				<IndexRedirect to="/Login" />
				<Route path="/Login" name="登录" component={Login}/>
				<Route path="/MainIndex" name="首页" component={MainIndex} >
					<Route path="companyIndex" name="公司列表" component={CompanyIndex} />
					<Route path="Manage" name="管理设置" component={Manage}>
						<Route path="UserIndex" name="用户列表" component={UserIndex} />
						<Route path="RoleIndex" name="角色列表" component={RoleIndex} />
						<Route path="permitIndex" name="权限列表" component={PermitIndex} />
					</Route>
					<Route path="storeIndex" name="门店列表" component={StoreIndex} />
					<Route path="formIndex" name="表单列表" component={FormIndex} >
						<Route path="Form" name="使用ant组件" component={Form} />
						<Route path="RowForm" name="不使用组件" component={RowForm} />
					</Route>
					<Route path="editorIndex" name="html编辑器" component={EditorIndex}></Route>
					<Route path="themeColor" name="自定义主题色" component={themeColor}></Route>
					<Route path="canvas" name="画板" component={canvas}></Route>
					<Route path="svg" name="svg动画" component={svg}></Route>
				</Route>
				<Route path="*" component={errorPage}/>
			</Route>

ReactDOM.render((
	<Router history={hashHistory} routes={routes} />
  	), document.getElementById('root'));

registerServiceWorker();



