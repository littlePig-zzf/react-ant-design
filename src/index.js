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
// import Manage from './view/manage/index';
// import UserIndex from './view/manage/user';
// import RoleIndex from './view/manage/role';
// import PermitIndex from './view/manage/permit';
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
					<Route path="/home" exact component={MainIndex} />
					<Route path={home + "companyIndex"} component={CompanyIndex} />
					<Route path={home + "storeIndex"} component={StoreIndex} />
					<Route path={home + "editorIndex"} component={EditorIndex}></Route>
					<Route path={home + "themeColor"} component={themeColor}></Route>
					<Route path={home + "canvas"} component={canvas}></Route>
					<Route path={home + "svg"} component={svg}></Route>
					<Route path={home + "storeIndex"} component={StoreIndex} />
					{/* <Manage>
						<Switch>
							<Redirect from={home + "Manage"} to={home + "Manage/UserIndex"} exact />
							<Route path={home + "Manage/UserIndex"} component={UserIndex} />
							<Route path={home + "Manage/RoleIndex"} component={RoleIndex} />
							<Route path={home + "Manage/permitIndex"} component={PermitIndex} />
						</Switch>
					</Manage> */}
					<FormIndex>
						<Switch>
							<Redirect from={home + "formIndex"} to={home + "formIndex/Form"} exact />
							<Route path={home + "formIndex/Form"} component={Form} />
							<Route path={home + "formIndex/RowForm"} component={RowForm} />
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
