import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Routes = () => {
    return (

        <Switch>
            <Redirect
                exact
                from="/"
                to="/dashboard"
            />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Route exact
                    path="/dashboard1">
                        component={DashboardView}
                </Route>
                <Menu.Item key="1" icon={<DesktopOutlined />}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                </Menu.Item>
            </Menu>


            <Redirect to="/not-found" />
        </Switch>
    );
};

export default Routes;