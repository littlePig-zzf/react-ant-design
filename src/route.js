import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Login from './view/login';

// 路由配置
import Home from './view/main/index';
import MainIndex from './view/main/mainCont';
import Table from './view/table/index';
import Form from './view/form/form';
import RowForm from './view/form/rowForm';
import EditorIndex from './view/editor/index';
import ThemeColor from './view/themeColor/index';
import Canvas from './view/canvas/index';
import Animation from './view/animation/index';
import Agenda from './view/agenda/index';

import ErrorPage from './view/errorPage/index'; // 找不到路由

import Account from './view/manage/account';
import Permit from './view/manage/permit';

export const routes = (
  <App>
    <Switch>
      <Route path="/" exact name="登录" component={Login} />
      <Home>
        <Switch>
          <Route
            path="/main"
            render={route => {
              console.log(route, 'router');
              return (
                <Switch>
                  <Redirect
                    from={route.match.url}
                    to={`${route.match.url}/index`}
                    exact
                  />
                  <Route
                    path={`${route.match.url}/index`}
                    component={MainIndex}
                  />
                  <Route path={`${route.match.url}/table`} component={Table} />
                  <Route
                    path={`${route.match.url}/editorIndex`}
                    component={EditorIndex}
                  />
                  <Route
                    path={`${route.match.url}/themeColor`}
                    component={ThemeColor}
                  />
                  <Route
                    path={`${route.match.url}/canvas`}
                    component={Canvas}
                  />
                  <Route
                    path={`${route.match.url}/animation`}
                    component={Animation}
                  />
                  <Route
                    path={`${route.match.url}/agenda`}
                    component={Agenda}
                  />
                  <Route
                    path={`${route.match.url}/manageIndex`}
                    render={route => {
                      // 使用render来实现嵌套路由的写法
                      return (
                        <Switch>
                          <Redirect
                            from={route.match.url}
                            to={`${route.match.url}/account`}
                            exact
                          />
                          <Route
                            path={`${route.match.url}/account`}
                            component={Account}
                          />
                          <Route
                            path={`${route.match.url}/Permit`}
                            component={Permit}
                          />
                        </Switch>
                      );
                    }}
                  />
                  <Route
                    path={`${route.match.url}/formIndex`}
                    render={route => {
                      return (
                        <Switch>
                          <Redirect
                            from={route.match.url}
                            to={`${route.match.url}/form`}
                            exact
                          />
                          <Route
                            path={`${route.match.url}/form`}
                            component={Form}
                          />
                          <Route
                            path={`${route.match.url}/rowForm`}
                            component={RowForm}
                          />
                        </Switch>
                      );
                    }}
                  />
                </Switch>
              );
            }}
          />
        </Switch>
      </Home>
      <Route path="*" component={ErrorPage} />
    </Switch>
  </App>
);
