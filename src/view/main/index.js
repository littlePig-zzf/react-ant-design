import React, { Component } from 'react';
import { Link } from 'react-router';
import './index.css';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Sider } = Layout;


class MainIndex extends Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  componentDidMount() {
    console.log(this.props.children);
  }
  render() {
    return (
      <div className="MainBox">
         <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <Link to="/MainIndex/companyIndex">
                    <Icon type="user" />
                    <span>nav 1</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="video-camera" />
                  <span>nav 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="upload" />
                  <span>nav 3</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Header>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              asdasd
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
      </div>
    );
  }
}

export default MainIndex;
