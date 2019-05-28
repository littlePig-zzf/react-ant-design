import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { getNavData } from '../common/nav';

export default class BreadItem extends Component {
  state = {
    routes: []
  };
  render() {
    const Home = withRouter(props => {
      const { location } = props;
      const pathSnippets = location.pathname.split('/').filter(i => i);
      const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
          <Breadcrumb.Item key={url}>
            <Link to={url}>
              {getNavData.map(item => {
                let res = '';
                if (item.path === url) {
                  res = item.name;
                } else if (item.children) {
                  item.children.map(cItem => {
                    if (cItem.path === url) {
                      res = cItem.name;
                    }
                    return res;
                  });
                }
                return res;
              })}
            </Link>
          </Breadcrumb.Item>
        );
      });
      return (
        <Breadcrumb style={{ margin: '0 0 10px' }}>
          {extraBreadcrumbItems}
        </Breadcrumb>
      );
    });
    return <Home />;
  }
}
