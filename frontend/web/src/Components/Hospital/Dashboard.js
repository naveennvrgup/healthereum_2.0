import React, { Component } from 'react'
import {
    Descriptions, Button, Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    AutoComplete,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import bc from '../../blockchain/app'
import * as constants from '../constants'

export default class Dashboard extends Component {
    state = {
        detail: [],
    }

    componentDidMount() {
        const user = constants.getaccount()
        bc.methods.getHospital(user.id).call().then(d=>this.setState({detail: d}))
    }
    

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-7">
                        <div>

                            <div title="Hospital Profile">
                                <div className='label'>Name</div>
                                <div className="description">{this.state.detail[0]}</div>
                                <div className='label'>Phones</div>
                                <div className="description">{this.state.detail[2]}</div>
                                <div className='label'>Address</div>
                                <div className="description">{this.state.detail[1]}</div>
                                <div className='label'>Speciality</div>
                                <div className="description">{this.state.detail[3]}</div>
                                <div className='label'>Emails</div>
                                <div className="description">{this.state.detail[4]}</div>
                                <div className='label'>Description</div>
                                <div className='description'>
                                    {this.state.detail[5]}
                                </div>
                                <div className='label'>Hospital Type</div>
                                <div className='description'>
                                    {this.state.detail[6] == 0 ? 'Government' : 'Private'}
                                </div>

                            </div>
                        </div>
                        <div className="text-center mt-5">
                            <Button
                                onClick={() => this.props.history.push('/hospital/new/')}
                                type='primary'>Edit</Button>
                        </div>
                    </div>
                    <div className="col-5">
                        <img className='w-100' src={require('../assets/placeholder.png')} />
                        <div className="text-center mt-5">
                            <Button type='primary'>new img</Button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
