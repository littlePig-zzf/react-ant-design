import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { getNavData } from '../../common/nav';

import MainCont from './mainCont';
import BreadItem from '../../components/BreadItem'
import './index.css';

const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class MainIndex extends Component {
  constructor(props, context) {
    super(props, context);
    console.log(this.props);
    
    this.navOpenChange = this.navOpenChange.bind(this)
  }
  state = {
    collapsed: false,
    curSelectKey: [], //当前选择的菜单
    curOpenNav: [] //当前需要打开的二级菜单
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  componentWillMount() {
    this.getCurIndex();
  }

  componentWillUpdate(nextProps) {
    if (this.props.location !== nextProps.location) { // 监听路由变化
      this.getCurIndex(nextProps.location);
    }
  }
  
  navOpenChange(openKeys) {
    this.setState({
      curOpenNav: openKeys
    })
  }

  getCurIndex(nextRouter) {
    const path = nextRouter ? nextRouter.pathname : this.props.location.pathname;
    getNavData.forEach((item, index) => {
      if (item.children) {
        item.children.forEach((cItem, cIndex) => {
          if (Object.is(cItem.path, path)) {
            this.setState({
              //使用setState修改state数据之后，并不能在这里直接打印最新的state的值，因为修改了之后还会执行一遍willUpdate
              curSelectKey: [index + "-" + cIndex],
              curOpenNav: [index.toString()]
            });
          }
        });
      } else {
        if (Object.is(item.path, path)) {
          this.setState({
            //使用setState修改state数据之后，并不能在这里直接打印最新的state的值，因为修改了之后还会执行一遍willUpdate
            curSelectKey: [index.toString()],
            curOpenNav: []
          });
        }
      }
    });
  }

  getMenu() {
    let menu = [];
    getNavData.forEach((item, index) => {
      if (item.children) {
        menu.push(
          <SubMenu
            key={index}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </span>
            }
          >
            {this.getSubMenu(item.children, index)}
          </SubMenu>
        );
      } else {
        menu.push(
          <Menu.Item key={index}>
            <Link to={item.path}>
              <Icon type={item.icon} />
              <span>{item.name}</span>
            </Link>
          </Menu.Item>
        );
      }
    });
    return menu;
  }
  getSubMenu(children, index) {
    let menu = [];
    children.forEach((cItem, cIndex) => {
      menu.push(
        <Menu.Item key={index + "-" + cIndex}>
          <Link to={cItem.path}>{cItem.name}</Link>
        </Menu.Item>
      );
    });
    return menu;
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/" replace={true}>
            退出
          </Link>
        </Menu.Item>
      </Menu>
    );
    return <div className="MainBox">
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" selectedKeys={this.state.curSelectKey} openKeys={this.state.curOpenNav} defaultSelectedKeys={this.state.curSelectKey} defaultOpenKeys={this.state.curOpenNav} onOpenChange={this.navOpenChange}>
              {this.getMenu()}
            </Menu>
          </Sider>
          <Layout className="rightCont">
            <Header style={{ background: "#fff", padding: 0 }}>
              <Icon className="trigger" type={this.state.collapsed ? "menu-unfold" : "menu-fold"} onClick={this.toggle} />
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link exitBtn">
                  {this.props.userName} <Icon type="down" />
                </a>
              </Dropdown>
            </Header>
            <Content style={{ margin: "24px", background: "#f0f2f5", minHeight: 280 }}>
              <BreadItem />
              {this.props.children || <MainCont />}
            </Content>
          </Layout>
        </Layout>

      </div>;
  }
}

const mapStateToProps = state => ({
  userName: state.userName || localStorage.getItem("userName")
});

export default connect(mapStateToProps)(MainIndex);
