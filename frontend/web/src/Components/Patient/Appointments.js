import React, { Component } from 'react'
import * as constants from '../constants'
import bc from '../../blockchain/app'
import web from '../../blockchain/web3'


export default class Appointments extends Component {
    state = {
        appointments: []
    }

    fetchAppointments = async () => {
        const user = constants.getaccount()

        await bc.methods.listPatientAppointments(user.id)
            .call().then(d => this.setState({ appointments: d }))

        console.log(this.state.appointments)

        await this.state.appointments.forEach(async ele => {
            let obj = {}

            await bc.methods.getAppointment(ele).call()
                .then(d => {
                    console.log(ele)
                    obj = {
                        ...obj,
                        createdAt: d[2],
                        accepted: d[3],
                        seen: d[4],
                        completed: d[5]
                    }
                })

            await bc.methods.getAppointmentNotes(ele).call()
                .then(d => {
                    console.log(d)
                    obj = {
                        ...obj,
                        patientNote: d[0],
                        receptionNote: d[1],
                        finalNote: d[2],
                        patientId: d[3],
                        hospitalId: d[4]
                    };
                })

            this.setState({ appointments: [...this.state.appointments, obj] })
        })

    }

    componentDidMount() {
        this.fetchAppointments()
    }


    render() {
        const temp = this.state.appointments.filter(ele => ele.createdAt && ele.createdAt.length>0)
        const trs = temp.map((ele, id) => <tr key={id}>
            <td>{id + 1}</td>
            <td>{ele.patientId}</td>
            <td>{ele.createdAt}</td>
            <td>{ele.receptionNote}</td>
            <td>{ele.accepted?'Yes':'No'}</td>
            <td>{ele.seen?'Yes':'No'}</td>
        </tr>)

        return (
            <div>
                <div className="d-flex my-3">
                    <h3 className="flex-grow-1">Appointments</h3>
                    <button onClick={() => this.props.history.push('/patient/appointments/new/')} className="btn btn-primary">New appointment</button>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>PatientID</th>
                            <th>CreatedAt</th>
                            <th>Receptionnote</th>
                            <th>Accepted</th>
                            <th>Seen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trs}
                    </tbody>
                </table>
            </div>
        )
    }
}
