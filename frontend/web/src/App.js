import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Content from './Components/Content';
import HospitalDashboard from './Components/Hospital/hospital-app-board';
import EmergencySearch from './Components/Hospital/emergency-search';
import RegisterDoctor from './Components/Hospital/register-doctor';
import DoctorDashboard from './Components/Doctor/doctor-app-board';
import ViewHistorybyDoctor from './Components/Doctor/doctor-viewhistory';
import PatientHistory from './Components/Patient/patient-history';
import blockchain from './blockchain/app';
import web3 from './blockchain/web3';

async function App() {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts)
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
            <Route path='/h-dashboard' component={HospitalDashboard} />
            <Route path='/emergency-search' component={EmergencySearch} />
            <Route path='/register-doctor' component={RegisterDoctor} />

            <Route path='/d-dashboard' component={DoctorDashboard} />
            <Route path='/dv-history' component={ViewHistorybyDoctor} />
            <Route path='/add-record' component={RegisterDoctor} />

            <Route path='/pv-history' component={PatientHistory} />

          </Switch>


        </div>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
