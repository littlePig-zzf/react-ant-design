import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';

import App from './App';
import Login from './view/login';
import registerServiceWorker from './registerServiceWorker';

// // 路由配置
import Home from './view/main/index';
import MainIndex from './view/main/mainCont';
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

const home = '/home/'

const routes = 
	<App>
		<Switch>
			<Route path="/Login" name="登录" component={Login}/>
			<Home>
				<Switch>
					<Route path="/home" exact name="首页" component={MainIndex} />
					<Route path={home + "companyIndex"} name="公司列表" component={CompanyIndex} />
					<Route path={home + "storeIndex"} name="门店列表" component={StoreIndex} />
					<Route path={home + "editorIndex"} name="html编辑器" component={EditorIndex}></Route>
					<Route path={home+"themeColor"} name="自定义主题色" component={themeColor}></Route>
					<Route path={home+"canvas"} name="画板" component={canvas}></Route>
					<Route path={home+"svg"} name="svg动画" component={svg}></Route>
					<Route path={home+"storeIndex"} name="门店列表" component={StoreIndex} />
					<Manage>
						<Switch>
							<Redirect from={home+"Manage"} to={home+"Manage/UserIndex"} exact />
							<Route path={home+"Manage/UserIndex"} name="用户列表" component={UserIndex} />
							<Route path={home+"Manage/RoleIndex"} name="角色列表" component={RoleIndex} />
							<Route path={home+"Manage/permitIndex"} name="权限列表" component={PermitIndex} />
						</Switch>
					</Manage>
					<FormIndex>
						<Switch>
							<Redirect from={home+"formIndex"} to={home+"formIndex/Form"} exact />
							<Route path={home+"formIndex/Form"} name="使用ant组件" component={Form} />
							<Route path={home+"formIndex/RowForm"} name="不使用组件" component={RowForm} />
						</Switch>
					</FormIndex>
				</Switch>
			</Home>
 			<Route path="*" component={errorPage}/>
		</Switch>
	</App>

ReactDOM.render((
	<BrowserRouter>
		{routes}
	</BrowserRouter>
  	), document.getElementById('root'));

registerServiceWorker();
