import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';

export default class WordsChain extends React.Component{
    
    render()
    {
        return(
            <View style={styles.parentStyle}>
            <View style={styles.rowStyle}>
                <Text>One</Text>
                <Text>Two</Text>
            </View>
            <View style={styles.rowStyle}>
                <Text>One</Text>
                <Text>Two</Text>
            </View>
            <View style={styles.rowStyle}>
                <Text>One</Text>
                <Text>Two</Text>
            </View>
            <View style={styles.rowStyle}>
                <Text>One</Text>
                <Text>Two</Text>
            </View>
            <View style={styles.rowStyle}>
                <Text>One</Text>
                <Text>Two</Text>
            </View>
            <View style={styles.rowStyle}>
                <Text>One</Text>
                <Text>Two</Text>
            </View>
            <View style={styles.rowStyle}>
                <Text>One</Text>
                <Text>Two</Text>
            </View>
            <View style={styles.rowStyle}>
                <Text>One</Text>
                <Text>Two</Text>
            </View>
            <Button style={styles.submitButton}>
                <Text>Done!</Text>
            </Button>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    parentStyle:{
        flex:1
    },
    rowStyle:{
        flexDirection:"row",
    },
    submitButton:{
        backgroundColor:'#ff4326',
        margin:'5%',
        
    }
});