import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';


export default class Test extends React.Component{

    _handleSubmit = async (values, bag) => {
        var x = global.web3.eth.accounts.create(web3.utils.randomHex(32));
        await Expo.SecureStore.setItemAsync('key', x.privateKey.substring(2));
        await Expo.SecureStore.setItemAsync('wallet', x.address);
        this.setState({address: x.address});
        this.setState({key: x.privateKey.substring(2)});
        console.log("myaddress:" + x.address);
        console.log("mykey:" + x.privateKey.substring(2));
      };

    render()
    {
        return(
            <View>
                <Button onPress={this._handleSubmit}>
                    <Text>Create Account</Text>
                </Button>
            </View>
        );
    }
}