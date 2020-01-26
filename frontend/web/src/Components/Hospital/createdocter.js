import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Input, Button } from 'antd'

import bc from '../../blockchain/app'
import web3 from '../../blockchain/web3'
import * as constants from '../constants'

class createdocter extends Component {
    createDocter = async (e) => {
        e.preventDefault()
        
        const user_type_id = constants.randomnumber();
        const user_id = constants.randomnumber();
        const user = constants.getaccount()

        const accounts = await web3.eth.getAccounts();
        console.log(this.name.value,
            this.phone.value,
            this.email.value,
            3,
            user_id,
            user_type_id)

        await bc.methods.setUser(
            this.name.value,
            this.phone.value,
            this.email.value,
            2,
            user_id,
            user_type_id
        ).send({ from: accounts[0] })

        console.log('created user')
        console.log(user.id,
            user_type_id,
            this.speciality.value,
            this.qualification.value,
            parseInt(this.gender.value))

        await bc.methods.addDocter(
            user.id,
            user_type_id,
            this.speciality.value,
            this.qualification.value,
            parseInt(this.gender.value)
        ).send({ from: accounts[0] })
        console.log('createddocter')

        this.props.history.goBack()
    }

    render() {
        return (
            <div className=''>
                <div className="font-weight-bold mt-3 mb-2">Name</div>
                <input placeholder='name' className='form-control w-50' ref={ele => this.name = ele} type="text" />
                <div className="font-weight-bold mt-3 mb-2">Email</div>
                <input placeholder='email' className='form-control w-50' ref={ele => this.email = ele} type="text" />
                <div className="font-weight-bold mt-3 mb-2">Phone</div>
                <input placeholder='phone' className='form-control w-50' ref={ele => this.phone = ele} type="text" />
                <div className="font-weight-bold mt-3 mb-2">Speciality</div>
                <input placeholder='speciality' className='form-control w-50' ref={ele => this.speciality = ele} type="text" />
                <div className="font-weight-bold mt-3 mb-2">Qualification</div>
                <input placeholder='qualification' className='form-control w-50' ref={ele => this.qualification = ele} type="text" />
                <div className="font-weight-bold mt-3 mb-2">Gender</div>
                <select ref={ele => this.gender = ele}>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                </select>

                <div className='w-50 mt-4 text-center'><Button
                    onClick={this.createDocter} type='primary'>Submit</Button></div>
            </div>
        )
    }
}

export default withRouter(createdocter)