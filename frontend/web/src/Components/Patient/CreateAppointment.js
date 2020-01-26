import React, { Component } from 'react'


import * as constants from '../constants'
import app from '../../blockchain/app'
import web from '../../blockchain/web3'


export default class CreateAppointment extends Component {
    state = {
        hids: [],
        hospitals: []
    }

    componentDidMount() {
        this.loadhospitals();
    }

    appointment = async () => {
        const acc = await web.eth.getAccounts()
        const user = constants.getaccount()
        const aid = constants.randomnumber()


        await app.methods.createAppointment(
            this.hospital.value,
            user.id,
            aid,
            new Date().toISOString()
        ).send({ from: acc[0] })

        await app.methods.setAppointmentExtras(
            aid,
            this.desc.value,
            '', ''
        ).send({ from: acc[0] })

        this.props.history.goBack();
    }


    loadhospitals = async () => {
        const acc = await web.eth.getAccounts()
        const user = constants.getaccount()

        await app.methods.listHospitals().call().then(d => {
            this.setState({ hids: d.map(e => e) })
        })

        this.state.hids.forEach(async hid=>{
            await app.methods.getHospital(hid).call().then(d => {
                this.setState({ hospitals: [...this.state.hospitals, d[0]] })
            })
        })

    }

    render() {
        let hospitaloptions = this.state.hospitals.map((ele, i) =>
            <option key={i} value={this.state.hids[i]}>{ele}</option>
        )

        return (
            <div>
                <h3>Create Appointment</h3>
                <select className='w-50 mt-2 form-control' ref={ele => this.hospital = ele}>
                    {hospitaloptions}
                </select>
                <textarea rows='3' className='w-50 mt-2 form-control' placeholder='details' ref={ele => this.desc = ele} />
                <div className="mt-3">
                    <button onClick={this.appointment} className="btn btn-primary">Submit</button>
                </div>
            </div>
        )
    }
}
