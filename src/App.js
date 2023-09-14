import React, { useEffect } from 'react';
import MenuItem from './pages/MenuItem';
import { Layout, App } from 'antd';
import { Outlet } from 'react-router-dom';

import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import UserCenter from './pages/UserCenter';
import NewArticle from './pages/NewArticle';


const { Header, Content, Footer } = Layout;
function AppLout() {


  return (
    <App>
      <Layout className="layout">

        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#FFFFFF',
            justifyContent: 'center'
          }}
        >
          <div className="demo-logo" />
          <MenuItem />
          {/* <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['2']}
        /> */}
        </Header>

        <Content
          style={{
            padding: '0 50px',
          }}
        >
          <div className="site-layout-content">

            <Outlet />

          </div>
        </Content>

        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </App>
  );
}

export default AppLout;
