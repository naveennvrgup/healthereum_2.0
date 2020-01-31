import React, { Component } from 'react'

import bc from '../../blockchain/app'
import web from '../../blockchain/web3'
import * as constants from '../constants'


export default class appoint extends Component {

    state = {
        docters: []
    }

    getdocter = async () => {
        const acc = await web.eth.getAccounts()
        const user = constants.getaccount()

        const temp = this.props.location.state
        console.log(temp)
        
    }

    componentDidMount() {
        this.getdocter()
    }
    

    render() {
        return (
            <div>
                appoint
            </div>
        )
    }
}
