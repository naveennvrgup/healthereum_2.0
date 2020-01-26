import React, { Component } from 'react'

import * as constants from '../constants'
import app from '../../blockchain/app'
import web from '../../blockchain/web3'

export default class Dashboard extends Component {
    state = {
        detail:null
    }

    componentDidMount() {
        this.fetchDetails();
    }

    fetchDetails = async () => {
        const acc = web.eth.getAccounts()
        const user = constants.getaccount()

        // app.methods.
    }
    

    render() {
        return (
            <div>
                <div className="d-flex justify-content-between align-items-center">
                    <h3>User details:</h3>
                    <button
                        onClick={() => this.props.history.push('/patient/new/')}
                        className="btn btn-primary">Edit profile</button>

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
                                <button
                                    className='btn btn-primary'
                                    onClick={() => this.props.history.push('/hospital/new/')}
                                    type='primary'>Edit</button>
                            </div>
                        </div>
                        <div className="col-5">
                            <img className='w-100' src={require('../assets/placeholder.png')} />
                            <div className="text-center mt-5">
                                <button type='primary'>new img</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
