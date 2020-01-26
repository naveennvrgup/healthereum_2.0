import React, { Component } from 'react'
import TextArea from 'antd/lib/input/TextArea'

import * as constants from '../constants'
import bc from '../../blockchain/app'
import web3 from '../../blockchain/web3'

export default class newhospital extends Component {
    addHospital = async (e) => {
        e.preventDefault()
        const acc = await web3.eth.getAccounts()
        const user = constants.getaccount();

        await bc.methods.addHospital(
            user.id,
            this.name.value,
            this.location.value,
            this.phones.value,
            this.speciality.value,
            this.emails.value,
            this.description.value,
            parseInt(this.type.value)
        ).send({ from: acc[0] })
            .then(d => {
                console.log(d)
            })

        this.props.history.push('/hospital/');
    }

    render() {
        return (
            <div>
                <form className='text-center'>
                    <h3>Hospital info</h3>
                    <input type="text" ref={ele => this.name = ele} placeholder='name' className="mx-auto mt-2 w-50 form-control" />
                    <input type="text" ref={ele => this.location = ele} placeholder='location' className="mx-auto mt-2 w-50 form-control" />
                    <input type="text" ref={ele => this.phones = ele} placeholder='phones' className="mx-auto mt-2 w-50 form-control" />
                    <input type="text" ref={ele => this.speciality = ele} placeholder='speciality' className="mx-auto mt-2 w-50 form-control" />
                    <input type="text" ref={ele => this.emails = ele} placeholder='emails' className="mx-auto mt-2 w-50 form-control" />
                    <textarea rows='3' type="text" ref={ele => this.description = ele} placeholder='description' className="mx-auto mt-2 w-50 form-control" />
                    <select className='mt-2 form-control w-50 mx-auto' ref={ele => this.type = ele}>
                        <option value="0">Government</option>
                        <option value="1">Private</option>
                    </select>
                    <div className="text-center my-5">
                        <button onClick={this.addHospital} className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
