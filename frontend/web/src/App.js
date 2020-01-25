import React, { Suspense, Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Content from './Components/Content';
import HospitalDashboard from './Components/Hospital/hospital-app-board';
import DoctorDashboard from './Components/Doctor/doctor-app-board';
import ViewHistorybyDoctor from './Components/Doctor/doctor-viewhistory';
import PatientHistory from './Components/Patient/patient-history';
import blockchain from './blockchain/app';
import web3 from './blockchain/web3';
import Torus from '@toruslabs/torus-embed'

// async function torusInit() {
//   const torus = new Torus({
//     buttonPosition: "top-right" // default: bottom-left 
//   });
//   global.torus = torus
//   await torus.init({
//     buildEnv: "production",
//     network: {
//       host: "matic", // default: mainnet
//     },
//     showTorusButton: true
//   })
//   torus.login().then(a1 => {
//     const web32 = new Web3(torus.provider);
//     web32.torus = torus
//     sessionStorage.setItem('pageUsingTorus', 'production')
//     torus.getUserInfo().then(a => {
//       console.log(a1)
//       blockchain.methods.setUser('god',
//         '123',
//         'god@gmail.com',
//         1,
//         123,
//         1).send({
//           from: a1[0]
//         })
//     })
//   })


// }


export default class App extends Component {
  componentDidMount() {
    this.doblockchain()

  }

  doblockchain = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts)

    // blockchain.methods.setUser('god','123','god@gmail.com',1,777,777)
    //   .send({from:accounts[0]})
    //   .then(d => {
    //     console.log()
    //   })

    blockchain.methods.getUser('god@gmail.com').call().then(d=>{
      console.log(d)
    })

    // blockchain.methods.compareStrings('abc', 'abdc').send({from: accounts[0]}).then(d => {
    //   console.log(d)
    // })


    // const accounts = await web3.eth.getAccounts();
    // console.log(accounts)

    // blockchain.methods.addUser('8940073123', 'naveen sundar', 'naveennvrgup@gmail.com', 1, 1, '17-12-1998')
    //   .send({from:accounts[0]})
    //   .then(d => {
    //     console.log()
    //   })

    // blockchain.methods.compareStrings('abc','abc').call().then(d => {
    //   console.log(d)
    // })
  }


  render() {
    return (
      <Suspense>
        <BrowserRouter>
          <div className="container">
            <Switch>
              <Route exact path='/' component={Content} />

              <Route path='/reception' component={HospitalDashboard} />

              <Route path='/docterDashboard' component={DoctorDashboard} />
              <Route path='/docterHistory' component={ViewHistorybyDoctor} />
              <Route path='/patientsHistory' component={PatientHistory} />

            </Switch>


          </div>
        </BrowserRouter>
      </Suspense>
    )
  }
}

