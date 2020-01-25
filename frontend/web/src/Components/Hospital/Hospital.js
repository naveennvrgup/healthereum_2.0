import React, { Component, } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import './Hospital.css';

import Dashboard from './Dashboard'
import Appointments from './appointments'
import Bills from './bills'
import Doctors from './doctors'

const { Header, Sider, Content } = Layout;

class Hospital extends Component {
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
            <Layout style={{ height: '100vh' }} >
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    {this.state.collapsed ?
                        <div className="text-center">
                            <Icon className='text-white py-4  h4' type="user" />
                        </div>
                        : <div className="logo text-white text-center h3 py-4">
                            Hospital
                </div>}
                    <Menu theme="dark" mode="inline" >
                        <Menu.Item to='/hosf/' className='d-flex align-items-baseline' onClick={() => this.props.history.push('/hospital/')} key="1">
                            <Icon type="dashboard" />
                            <span>Dashboard</span>
                        </Menu.Item>
                        <Menu.Item className='d-flex align-items-baseline' onClick={() => this.props.history.push('/hospital/appointments/')} key="2">
                            <Icon type="clock-circle" />
                            <span>Appointments</span>
                        </Menu.Item>
                        <Menu.Item className='d-flex align-items-baseline' onClick={() => this.props.history.push('/hospital/doctors/')} key="3">
                            <Icon type="heart" />
                            <span>Docters</span>
                        </Menu.Item>
                        <Menu.Item className='d-flex align-items-baseline' onClick={() => this.props.history.push('/hospital/bills/')} key="4">
                            <Icon type="credit-card" />
                            <span>Bills</span>
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
                            <Route component={Appointments} path='/hospital/appointments/' />
                            <Route component={Doctors} path='/hospital/doctors/' />
                            <Route component={Bills} path='/hospital/bills/' />
                            <Route component={Dashboard}  path='/hospital/' />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(Hospital)
