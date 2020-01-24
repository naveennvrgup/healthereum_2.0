import React, { Suspense, Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Content from './Components/Content';
import HospitalDashboard from './Components/Hospital/hospital-app-board';
import DoctorDashboard from './Components/Doctor/doctor-app-board';
import ViewHistorybyDoctor from './Components/Doctor/doctor-viewhistory';
import PatientHistory from './Components/Patient/patient-history';
import blockchain from './blockchain/app';
import Torus from '@toruslabs/torus-embed'
import Web3 from 'web3';

async function torusInit() {
  const torus = new Torus({
    buttonPosition: "top-right" // default: bottom-left
    });
  await torus.init({ 
    buildEnv: "production",
    network: {
        host: "rinkeby", // default: mainnet
        chainId: 4, // default: 1
        networkName: "Rinkeby Test Network" // default: Main Ethereum Network
      },
    showTorusButton: true
  })
    await torus.login()
    const web32 = new Web3(torus.provider);
    web32.torus = torus
    sessionStorage.setItem('pageUsingTorus', 'production')
}
function App() {
    torusInit().then(a=>console.log(a))
  // blockchain.methods.addUser('8940073123', 'naveen sundar', 'naveennvrgup@gmail.com', 1, 1, '17-12-1998')
  //   .send({from:accounts[0]})
  //   .then(d => {
  //     console.log()
  //   })

  blockchain.methods.getHospitals().call().then(d => {
    console.log(d)
  })

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
    )
  }
}

