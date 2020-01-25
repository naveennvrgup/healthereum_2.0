import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, Text } from 'react-native';
import { Constants } from 'expo';

export default class PatientFullDetail extends Component {
  render() {
    return (
    <ScrollView style={styles.container}>
        <Text style={styles.head}>MEDICAL CONDITIONS</Text>
        <Text style={styles.body}>High Blood Pressure{"\n"}</Text>
        <Text style={styles.head}>ALLERGIES & REACTIONS</Text>
        <Text style={styles.body}>Penicilline - Severe Skin rash{"\n"}</Text>
        <Text style={styles.head}>MEDICATIONS</Text>
        <Text style={styles.body}>Indapamide (10mg per day){"\n"}</Text>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    padding: "5%",
  },
  head:{
    fontWeight: "bold",
    color: "#fa417f",
  },
  body:{
    color:"#484a48"
  }
});
