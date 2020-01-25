import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Constants } from 'expo';

export default class PatientBio extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.detailView}>
            <Text>Height</Text>
            <Text>179cm</Text>
        </View>
        
        <View style={styles.detailView}>
            <Text>Weight</Text>
            <Text>59kgs</Text>
        </View>

        <View style={styles.detailView}>
            <Text>Blood Type</Text>
            <Text>O+</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: '#ffff',
    paddingTop:'8%',
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  detailView: {
      margin:"10%",
      marginTop:"0%"
  }
});
