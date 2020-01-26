import React, { Component } from 'react'

import * as constants from '../constants'
import app from '../../blockchain/app'
import web from '../../blockchain/web3'



export default class CreatePatient extends Component {
    setDetails = async (e) => {
        e.preventDefault()
        const acc = await web.eth.getAccounts()
        const user = constants.getaccount()

        // debugger

        await app.methods.addPatient(
            user.id,
            parseInt(this.height.value),
            parseInt(this.weight.value),
            this.dob.value,
            this.bloodtype.value
        ).send({ from: acc[0] })

        await app.methods.addPatientExtras(
            user.id,
            this.medicalConditions.value,
            this.allergies.value,
            this.importantnotes.value,
            this.medications.value,
            this.organdonor.checked
        ).send({ from: acc[0] })

        this.props.history.push('/patient/')
    }

    render() {
        return (
            <div >
                <h3>User Details</h3>
                <input className='w-50 mt-2 form-control' placeholder='height' ref={ele => this.height = ele} type="number" />
                <input className='w-50 mt-2 form-control' placeholder='weight' ref={ele => this.weight = ele} type="number" />
                <input className='w-50 mt-2 form-control' placeholder='dob' ref={ele => this.dob = ele} type="date" />
                <select className='w-50 mt-2 form-control' ref={ele => this.bloodtype = ele}>
                    <option value="0">Op</option>
                    <option value="1">On</option>
                    <option value="2">Ap</option>
                    <option value="3">An</option>
                    <option value="4">Bp</option>
                    <option value="5">Bn</option>
                    <option value="6">ABp</option>
                    <option value="7">ABn</option>
                </select>
                <textarea rows='3' className='w-50 mt-2 form-control' placeholder='medicalConditions' ref={ele => this.medicalConditions = ele} type="text" />
                <textarea rows='3' className='w-50 mt-2 form-control' placeholder='allergies' ref={ele => this.allergies = ele} type="text" />
                <textarea rows='3' className='w-50 mt-2 form-control' placeholder='medications' ref={ele => this.medications = ele} type="text" />
                <textarea rows='3' className='w-50 mt-2 form-control' placeholder='importantNotes' ref={ele => this.importantnotes = ele} type="text" />
                <div className='mt-2'>
                    <input className='mx-3 ' placeholder='organDonar' ref={ele => this.organdonor = ele} type="checkbox" />
                    Organ donor
                </div>
                <div className="text-center w-50">
                    <button onClick={this.setDetails} className='mt-5 btn btn-primary'>Submit</button>
                </div>
            </div>
        )
    }
}
