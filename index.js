/**
 * @format
 */
import messaging from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';
import {displayNotification} from './src/Utilities/Helpers';
import {firebase} from '@react-native-firebase/auth';

firebase.initializeApp();

messaging().setBackgroundMessageHandler(async message => {
  if (message.data && message.data.notifee) {
    // Display the notification using Notifee from background
    await displayNotification(message);
  }
});

AppRegistry.registerComponent(appName, () => App);
