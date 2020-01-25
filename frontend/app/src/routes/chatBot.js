import React from 'react';
import { 
    Text,
    StyleSheet 
} from 'react-native';
import zulip from 'zulip';

class ChatBot extends React.Component {

    componentDidMount()
    {
        client = new zulip.Client({
            email: "feedback-bot-bot@zulipchat.com",
            api_key: " quvQhpZ8UTDHAvnPWKZ26BdYnaEx4QI9",
            verbose: true
        });
        
        client.sendMessage({
            type: "private",
            content: "Zulip rules!",
            to: ['user1@example.com']
        });
    }
    

    render(){
        return(
            <Text style={style.body}>
                This is Chatbot Page
            </Text>
        );
    }
}

const style = StyleSheet.create({
    body: {
        margin: 20
    }
});

export default ChatBot;
