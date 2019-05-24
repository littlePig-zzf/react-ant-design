import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './App';
import Login from './view/login'

// 路由配置
import Home from './view/main/index'
import MainIndex from './view/main/mainCont'
import CompanyIndex from './view/company/index'
import Form from './view/form/form'
import RowForm from './view/form/rowForm'
import EditorIndex from './view/editor/index'
import ThemeColor from './view/themeColor/index'
import Canvas from './view/canvas/index'
import Animation from './view/animation/index'
import Agenda from './view/agenda/index'

import ErrorPage from './view/errorPage/index'; // 找不到路由

import Account from './view/manage/account'
import Permit from './view/manage/permit'

const home = '/home/'

const store = createStore(rootReducer)

const routes =
<App>
  <Switch>
    <Route
      path='/'
      exact
      name='登录'
      component={Login} />
    <Home>
      <Switch>
        <Route path='/home' exact component={MainIndex} />
        <Route path={home + 'companyIndex'} component={CompanyIndex} />
        <Route path={home + 'editorIndex'} component={EditorIndex} />
        <Route path={home + 'themeColor'} component={ThemeColor} />
        <Route path={home + 'canvas'} component={Canvas} />
        <Route path={home + 'animation'} component={Animation} />
        <Route path={home + 'agenda'} component={Agenda} />
        <Route path={home + 'manageIndex'} render={(route) => { // 使用render来实现嵌套路由的写法
          return (
            <Switch>
              <Redirect from={route.match.url} to={`${route.match.url}/account`} exact/>
              <Route path={`${route.match.url}/account`} component={Account} />
              <Route path={`${route.match.url}/Permit`} component={Permit} />
            </Switch>
          )
        }} />
        <Route path={home + 'formIndex'} render={(route) => {
          return (
            <Switch>
              <Redirect from={route.match.url} to={`${route.match.url}/form`} exact/>
              <Route path={`${route.match.url}/form`} component={Form} />
              <Route path={`${route.match.url}/rowForm`} component={RowForm} />
            </Switch>
          )
        }} />
      </Switch>
    </Home>
    <Route path='*' component={ErrorPage} />
  </Switch>
</App>

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
