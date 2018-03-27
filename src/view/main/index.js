import React, { Component } from 'react';
import { Link } from 'react-router';
import './index.css';
import { Layout, Menu, Icon } from 'antd';
import { getNavData } from '../../common/nav';

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
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                {
                  getNavData.map((item, index)=>{
                    return  (
                        <Menu.Item key={index}>
                          <Link to={item.path}>
                            <Icon type={item.icon} />
                            <span>{item.name}</span>
                          </Link>
                        </Menu.Item>
                      )
                  })
                }
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
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
      </div>
    );
  }
}

export default MainIndex;
