/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
// import { Router } from './src/routes/Router';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';

// Basic configuration
PushNotification.configure({
    onRegister: function (token) {
        console.log('TOKEN:', token);
    },

    channelId: '1',

    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    popInitialNotification: true,

    requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);
