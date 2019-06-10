This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

### `npm run build`

### `npm run eject`



##### 使用create react app的脚手架，ant-design的ui组件 + mock模拟数据 + react-dedux  状态管理 + react-router-dom 路由

##### 项目结构：

```
|-react-ant-design
  |-config-overrides.js // 配置webpack
  |-package.json
  |-public			   // 打包生成的文件
  |  |-favicon.ico
  |  |-index.html
  |  |-manifest.json
  |-README.md
  |-src
  |  |-actions          // redux的actions配置
  |  |  |-index.js
  |  |-App.jsx          // 入口页面
  |  |-App.scss
  |  |-App.test.js
  |  |-common
  |  |  |-global.js     // 设置全局可访问的变量
  |  |  |-images
  |  |  |  |-login_bg.jpg
  |  |  |-nav.js        // 设置侧边栏的nav的json数据，跟router匹配
  |  |-components       // 通用的组件
  |  |  |-BarEchart.jsx // echart组件
  |  |  |-BreadItem.jsx // 面包屑
  |  |  |-TabFrame.jsx  // tab标签栏
  |  |-index.js         // 入口文件
  |  |-index.scss
  |  |-logo.svg
  |  |-mock
  |  |  |-index.js      // mock假接口
  |  |-reducers         // redux的reducers
  |  |  |-index.js
  |  |-route.js         // 路由配置
  |  |-service		   // axios封装以及api的配置
  |  |  |-api.js
  |  |  |-client.js
  |  |-serviceWorker.js
  |  |-view             // 页面
  |  |  |-agenda        // 日程表
  |  |  |  |-index.jsx
  |  |  |  |-index.scss
  |  |  |-animation     // 动画
  |  |  |  |-index.jsx
  |  |  |  |-index.scss
  |  |  |-canvas	    // 自定义画布
  |  |  |  |-canvas.js
  |  |  |  |-index.jsx
  |  |  |  |-index.scss
  |  |  |-editor   		// 富文本编辑器
  |  |  |  |-index.jsx
  |  |  |  |-index.scss
  |  |  |-errorPage     // 错误页面
  |  |  |  |-index.jsx
  |  |  |-form          // 表单
  |  |  |  |-form.jsx
  |  |  |  |-rowForm.jsx
  |  |  |-login         // 登陆
  |  |  |  |-index.jsx
  |  |  |  |-index.scss
  |  |  |-main          // 主页面
  |  |  |  |-index.jsx
  |  |  |  |-index.scss
  |  |  |  |-mainCont.jsx
  |  |  |-manage
  |  |  |  |-account.jsx
  |  |  |  |-permit.jsx
  |  |  |-table         // 表格
  |  |  |  |-index.jsx
  |  |  |-themeColor    // 主题色
  |  |  |  |-index.jsx
  |  |  |-transform     // 可拖拽的穿梭栏
  |  |  |  |-index.jsx
  |  |  |  |-index.scss
  |  |  |  |-sortableList.jsx
  |-yarn.lock
```



##### react-redux使用方式：
1、在入口文件index.js中，引入redux的{createStore}方法，同时引入reducers的rootReducer模块，之后引入react-redux的Provide的方法，包裹路由组件。例如

```
// index.js
import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
const store = createStore(rootReducer);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>{routes}</BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// reducers/index.js

import { combineReducers } from 'redux';

const Token = (state = '', action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      localStorage.setItem('token', action.token);
      return action.token;
    default:
      return state;
  }
};

export default combineReducers({
  Token
});

```

2、新建action模块，例如

```
export const setToken = token => ({
  type: 'SET_TOKEN',
  token
});
```

3、组组件中调用方式：

```
// index.jsx
import { connect } from 'react-redux';
this.props.dispatch(setToken(res.token));
```

4、获取redux中的state：

```
// index.jsx
import { connect } from 'react-redux';
class MainIndex extends Component {
    render() {
        return ()
    }
}
const mapStateToProps = state => ({
  userName: state.UserName || localStorage.getItem('userName')
});
export default connect(mapStateToProps)(MainIndex);

```

