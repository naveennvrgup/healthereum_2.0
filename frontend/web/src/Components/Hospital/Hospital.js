import React, { Component, } from 'react'
import { Layout, Menu, Icon } from 'antd';
import './Hospital.css';

const { Header, Sider, Content } = Layout;

export default class Hospital extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout style={{ height: '100vh' }} >
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    {this.state.collapsed ?
                        <div className="text-center">
                            <Icon className='text-white py-4  h4' type="user" />
                        </div>
                        : <div className="logo text-white text-center h3 py-4">
                            Hospital
                </div>}
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="dashboard" />
                            <span>Dashboard</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="clock-circle" />
                            <span>Appointments</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="heart" />
                            <span>Docters</span>
                        </Menu.Item>
                        <Menu.Item key="r">
                            <Icon type="credit-card" />
                            <span>Bills</span>
                        </Menu.Item>
                        <Menu.Item key="r">
                            <Icon type="logout" />
                            <span>Logout</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: '0 20px' }}>
                        {this.state.collapsed ?
                            <Icon type="menu-unfold" className='trigger' onClick={this.toggle} /> :
                            <Icon type="menu-fold" className='trigger' onClick={this.toggle} />}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        Content
              </Content>
                </Layout>
            </Layout>
        );
    }
}
