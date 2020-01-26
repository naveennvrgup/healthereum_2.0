import React, { Component } from 'react'

import * as constants from '../constants'
import app from '../../blockchain/app'
import web from '../../blockchain/web3'

export default class Dashboard extends Component {
    state = {
        detail: []
    }

    componentDidMount() {
        this.fetchDetails();
    }

    fetchDetails = async () => {
        const acc = web.eth.getAccounts()
        const user = constants.getaccount()

        let obj = []
        await app.methods.getPatient(user.id).call().then(d => {
            for (let x in d) {
                obj.push(d[x])
            }
        })

        await app.methods.getPatientExtra(user.id).call().then(d => {
            for (let x in d) {
                obj.push(d[x])
            }
        })
        console.log(obj)
        this.setState({ detail: obj })
    }


    render() {
        return (
            <div>
                <div className="d-flex justify-content-between align-items-center">

                    <div className="row">
                        <div className="col-8">
                            <div>
                                <div className="d-flex justify-content-between">
                                    <h3>User details:</h3>
                                    <button
                                        onClick={() => this.props.history.push('/patient/new/')}
                                        className="btn btn-primary">Edit profile</button>
                                </div>

                                <div title="Hospital Profile">
                                    <div className='label'>DOB</div>
                                    <div className="description">{this.state.detail[1]}</div>
                                    <div className='label'>Oragan donor</div>
                                    <div className="description">{this.state.detail[2]}</div>
                                    <div className='label'>Blood type</div>
                                    <div className="description">{this.state.detail[3]}</div>
                                    <div className='label'>Height</div>
                                    <div className="description">{this.state.detail[4]}</div>
                                    <div className='label'>Weight</div>
                                    <div className="description">{this.state.detail[5]}</div>
                                    <div className='label'>Medical Conditions</div>
                                    <div className="description">{this.state.detail[6]}</div>
                                    <div className='label'>Allergies</div>
                                    <div className="description">{this.state.detail[7]}</div>
                                    <div className='label'>Important notes</div>
                                    <div className="description">{this.state.detail[9]}</div>
                                    <div className='label'>Medications</div>
                                    <div className="description">{this.state.detail[8]}</div>

                                </div>
                            </div>
                        </div>
                        <div className="col-4">
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
