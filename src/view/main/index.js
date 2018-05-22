import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import './index.css';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { getNavData } from '../../common/nav';

import MainCont from './mainCont';
import BreadItem from '../../components/BreadItem'

const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class MainIndex extends Component {
  state = {
    collapsed: false,
    curSelectKey: [],  //当前选择的菜单
    curPath: '',  //当前选择的路由
    curOpenNav: []  //当前需要打开的二级菜单
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  componentWillMount() {
    let path = browserHistory.getCurrentLocation().hash;  //获取当前的路由
    let curPath = path.substr(1, path.length-1);
    this.setState({
      curPath: path.substr(1, path.length-1)
    })
    getNavData.forEach((item, index)=>{
      if(item.children) {
        item.children.forEach((cItem,cIndex)=>{
          if(Object.is(cItem.path, curPath)){
            this.setState({  //使用setState修改state数据之后，并不能在这里直接打印最新的state的值，因为修改了之后还会执行一遍willUpdate
              curSelectKey: [index + '-' + cIndex],
              curOpenNav: [index.toString()]
            })
          }
        })
      }
      else{
        if(Object.is(item.path, curPath)){
          this.setState({  //使用setState修改state数据之后，并不能在这里直接打印最新的state的值，因为修改了之后还会执行一遍willUpdate
            curSelectKey: [index.toString()]
          })
        }
      }
    })
  }
  getMenu() {
    console.log(this.state.curSelectKey)
    let menu = [];
    getNavData.forEach((item, index)=>{
        if(item.children) {
            menu.push(
              <SubMenu
                key={index}
                title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
              {
                this.getSubMenu(item.children, index)
              }
              </SubMenu>
            )
        }else{
            menu.push(
              <Menu.Item key={index}>
                <Link to={item.path}>
                  <Icon type={item.icon} />
                  <span>{item.name}</span>
                </Link>
              </Menu.Item>
          )
        }
    })
    return menu;
  }
  getSubMenu(children, index) {
    let menu = [];
    children.forEach((cItem, cIndex)=>{
      menu.push(
        <Menu.Item key={index + '-' + cIndex}>
          <Link to={cItem.path}>
            {cItem.name}
          </Link>
        </Menu.Item>
      )
    })
    return menu
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/Login" replace="true">
            退出
          </Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="MainBox">
         <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}>
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={this.state.curSelectKey} defaultOpenKeys={this.state.curOpenNav}>
                {this.getMenu()}
              </Menu>
            </Sider>
            <Layout className="rightCont">
              <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link exitBtn">
                    littple pig<Icon type="down" />
                  </a>
                </Dropdown>
              </Header>
              <Content style={{ margin: '24px', background: '#f0f2f5', minHeight: 280 }}>
                <BreadItem></BreadItem>
                {this.props.children || <MainCont />}
              </Content>
            </Layout>
          </Layout>
      </div>
    );
  }
}

export default MainIndex;
