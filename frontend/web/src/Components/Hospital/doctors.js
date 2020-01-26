import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import bc from '../../blockchain/app'
import * as constants from '../constants'

class doctors extends Component {
    state = {
        doctors: [],
        doctorsId: []
    }

    componentDidMount() {
        console.log(constants.getaccount())
        this.fetchDocs()
    }

    fetchDocs = async () => {
        const user = constants.getaccount()

        await bc.methods.listDocters(user.id).call()
            .then(d => {
                console.log(d)
                this.setState({ doctorsId: d });
            })

        await this.state.doctorsId.forEach(async did => {
            await bc.methods.getDocter(user.id, did).call().then(data => {
                console.log(data)
                this.setState({ doctors: [...this.state.doctors, data] })
            })
        })
    }


    newDocter = () => {
        this.props.history.push('/hospital/doctors/new/')
    }

    render() {
        const trs = this.state.doctors.map((docter, i) =>
            <tr>
                <th scope="row">{i + 1}</th>
                <td>{docter[1]}</td>
                <td>{docter[2]}</td>
                <td>{docter[3] == '0' ? 'Male' : "Female"}</td>
            </tr>)

        return (
            <div>
                <div className="d-flex justify-content-between align-items-baseline">
                    <h3>Docters:</h3>
                    <div className="text-right my-3"><button className='btn btn-primary' onClick={this.newDocter}>new doctor</button></div>
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

export default withRouter(doctors)