import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { 
    Container, 
    Header, 
    Left, 
    Body, 
    Right, 
    Button, 
    Icon, 
    Title 
} from 'native-base';

import PatientHeader from '../components/PatientHeader';
import PatientDetails from '../components/PatientDetails';
import PatientBio from '../components/PatientBio';
import PatientFullDetail from '../components/PatientFullDetail';
import PatientButtons from '../components/PatientButtons';

    
export default class PatientProfile extends Component {
  render() {
    return (
      <Container style={styles.Container}>
        <PatientHeader />
        <PatientDetails />
        <PatientButtons />
        <PatientBio />
        <PatientFullDetail />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    Container:{
        paddingTop: 22,
        backgroundColor: '#fcd6cf',
        flex:1
    }
});