import React, { Component, } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import '../Hospital/Hospital.css';

import AppointmentDetail from './AppointmentDetail'
import Appointments from './Appointments'
import Dashboard from './Dashboard'


const { Header, Sider, Content } = Layout;

class Docter extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    logout = () => {
        alert('logged out')
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }} >
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    {this.state.collapsed ?
                        <div className="text-center">
                            <Icon className='text-white py-4  h4' type="user" />
                        </div>
                        : <div className="logo text-white text-center h3 py-4">
                            Docter
                </div>}
                    <Menu theme="dark" mode="inline" >
                        <Menu.Item className='d-flex align-items-baseline' onClick={() => this.props.history.push('/docter/')} key="1">
                            <Icon type="dashboard" />
                            <span>Dashboard</span>
                        </Menu.Item>
                        <Menu.Item className='d-flex align-items-baseline' onClick={() => this.props.history.push('/docter/appointments/')} key="1">
                            <Icon type="dashboard" />
                            <span>Appointments</span>
                        </Menu.Item>
                        <Menu.Item onClick={this.logout} className='d-flex align-items-baseline' key="5">
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
                        <Switch>
                            <Route component={AppointmentDetail} path='/docter/appointments/detail/' />
                            <Route component={Appointments} path='/docter/appointments/' />
                            <Route component={Dashboard} path='/docter/' />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(Docter)
