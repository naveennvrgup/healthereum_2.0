import React, { Component } from 'react'
import bc from '../../blockchain/app'
import web from '../../blockchain/web3'
import * as constants from '../constants'


export default class newappointment extends Component {
    addAppointment = async (e) => {
        e.preventDefault();

        const acc = await web.eth.getAccounts()
        const user = constants.getaccount()
        let patiend_id = null
        const appointmentId = constants.randomnumber()

        await bc.methods.getUser(this.email.value)
        .call().then(d=>{
            patiend_id=d[4]
        })

        await bc.methods.createAppointment(
            user.id,
            patiend_id,
            appointmentId,
            new Date().toISOString()
        ).send({from:acc[0]})

        await bc.methods.setAppointmentExtras(
            appointmentId,
            '',
            this.desc.value,
            ''
        ).send({from:acc[0]})

        this.props.history.goBack();
    }

    render() {
        return (
            <div className='text-center'>
                <h3>New appointment</h3>
                <input ref={ele => this.email = ele} type="text" placeholder='patient email' className='w-50 mt-3 form-control mx-auto' />
                <textarea ref={ele => this.desc = ele} rows='3' type="text" placeholder='description' className='w-50 mt-3 form-control mx-auto' />
                <div>
                    <button className="mt-5 btn btn-primary" onClick={this.addAppointment}>Submit</button>
                </div>
            </div>
        )
    }
}
