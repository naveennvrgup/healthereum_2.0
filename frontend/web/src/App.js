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

            <Route path='/docter' component={Docter} />
            <Route path='/hospital' component={Hospital} />
            <Route path='/patient' component={Patient} />

          </Switch>

        </BrowserRouter>
      </Suspense>
    )
  }
}

