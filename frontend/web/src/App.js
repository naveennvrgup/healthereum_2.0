import React, { Suspense, Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';
import Content from './Components/Content';

import Hospital from './Components/Hospital/Hospital'
import Docter from './Components/Doctor/Docter'
import Patient from './Components/Patient/Patient'


export default class App extends Component {

  render() {
    return (
      <Suspense>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Content} />

            <Route path='/docter' exact={true} component={Docter} />
            <Route path='/hospital' exact={true} component={Hospital} />
            <Route path='/patient' exact={true} component={Patient} />

          </Switch>

        </BrowserRouter>
      </Suspense>
    )
  }
}

