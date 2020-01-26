import React, { Component } from 'react'

export default class appointments extends Component {
    state = {
        appointments: []
    }

    render() {
        const trs = this.state.appointments.map(ele => <tr>
            <th>#</th>
            <th>Speciality</th>
            <th>Qualification</th>
            <th>Gender</th>
        </tr>)

        return (
            <div>
                <div className="text-right my-3">
                    <button onClick={()=>this.props.history.push('/hospital/appointments/new/')} className="btn btn-primary">New appointment</button>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Speciality</th>
                            <th>Qualification</th>
                            <th>Gender</th>
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
