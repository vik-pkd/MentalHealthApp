import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';

interface CocosWebviewComponentState {
    webViewUrl: string;
}

class CocosWebviewComponent extends Component<{}, CocosWebviewComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            webViewUrl: 'https://google.com', // Replace with your WebView URL
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* WebView */}
                <WebView source={{ uri: this.state.webViewUrl }} style={{ flex: 1 }} />

                {/* Label */}
                <Text style={{ fontSize: 18, textAlign: 'center' }}>
                    Message will appear here
                </Text>

                {/* Button */}
                <Button
                    title="Send JSON to Cocos"
                    onPress={() => {
                        // Handle button click here
                        // alert('JSON Sent!');
                    }}
                />
            </View>
        );
    }
}

export default CocosWebviewComponent;