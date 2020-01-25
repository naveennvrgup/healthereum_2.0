import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Constants } from 'expo';

export default class PatientDetails extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image 
          style={styles.image}
          resizeMode={"cover"}
          source={{ uri: "https://s-media-cache-ak0.pinimg.com/736x/43/cd/6e/43cd6e82491bf130d97624c198ee1a3f--funny-movie-quotes-funny-movies.jpg"}}
        />
        <Text style={styles.Title}>Name Goes Here</Text>
        <Text style={styles.subTitle}>DOB (x yr old)</Text>
        <Text style={styles.subTitle}>Organ Donor</Text>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "30%",
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  Title:{
    fontWeight: "bold"
  },
  subTitle:{
    color:"#484a48"
  }
});
