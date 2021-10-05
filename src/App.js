import './App.css';
import Dashboard from './Dashboard/Dashboard';
import Products from './Woocommerce/Products/Products';
import OrdersPos from './Woocommerce/OrdersPos/OrdersPos';
// import React, { useEffect, useState } from 'react';
import { Layout, Menu, BackTop } from 'antd';

import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route 
} from "react-router-dom";

import {
  DesktopOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const App = () => {

  

  // const [selectedMenuItem, setSelectedMenuItem] = useState()

  // useEffect(() => {

  //   if(window.location.pathname === '/woocommerce-products'){
  //     let a = "2"
  //     setSelectedMenuItem(a)
  //   }else{
  //     setSelectedMenuItem("1")
  //   }

  // });

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<DesktopOutlined />}>
              <Link to="/dashboard"></Link>
              Dashboard
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Woocommerce">
              <Menu.Item key="2"> <Link to="/woocommerce-products"></Link> Products </Menu.Item>
              <Menu.Item key="3"><Link to="/woocommerce-orders-pos"></Link> Orders POS</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
 
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360, margin: '16px 0' }}>
              <Switch>
                <Route exact path="/">
                  <Dashboard />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/woocommerce-products">
                  <Products />
                </Route>
                <Route path="/woocommerce-orders-pos">
                  <OrdersPos />
                </Route>
              </Switch>
            </div>
            <BackTop />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Developed By Akis Paneras</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
