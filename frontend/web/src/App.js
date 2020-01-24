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



export default class App extends Component {
  componentDidMount() {
    
  }
  

  render() {
    return (
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

