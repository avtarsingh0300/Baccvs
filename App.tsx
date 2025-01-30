import Geolocation from '@react-native-community/geolocation';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {AppState, LogBox, PermissionsAndroid, Platform} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import Routes from './src/Navigation/Routes';
import store from './src/Redux/store';
import {getUserData, sendUserStatus} from './src/Utilities/Constants/auth';
import {displayNotification, getFCMToken} from './src/Utilities/Helpers';
import fontFamily from './src/Utilities/Styles/fontFamily';
import {moderateScale, textScale} from './src/Utilities/Styles/responsiveSize';
// import {StripeProvider} from '@stripe/stripe-react-native';

LogBox.ignoreAllLogs();

const App = () => {
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const requestLocationPermissionIOS = () => {
    Geolocation.requestAuthorization();
  };

  const requestNotificationPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const fcmTokn = await getFCMToken();

    console.log(fcmTokn);
    

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted.');
    } else {
      console.warn('Notification permission not granted.');
    }
  };

  useEffect(() => {
    getUserData();

    SplashScreen.hide();
    if (Platform.OS === 'ios') {
      requestLocationPermissionIOS();
    } else {
      if (Platform.OS === 'android') {
        requestLocationPermission();
      }
    }
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      if (nextAppState === 'background') {
        // Run the function when the app goes to the background
        const data = {
          status: false,
          lastseen: new Date(),
        };
        sendUserStatus(data)
          .then(res => {
            // console.log(res, 'res in sendUserStatus');
          })
          .catch(err => {
            console.log(err, 'err in sendUserStatus');
          });
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);
  getFCMToken();

  useEffect(() => {
    SplashScreen.hide();

    // Request notification permissions
    requestNotificationPermission();

    // Handle foreground notifications
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification received:', remoteMessage);
      await displayNotification(remoteMessage); // Show notification
    });

    return () => {
      unsubscribeForeground();
    };
  }, []);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <Routes />
          <FlashMessage
            titleStyle={{
              marginRight: moderateScale(5),
              fontFamily: fontFamily.time_regular,
              fontSize: textScale(12),
            }}
            style={{
              paddingTop: 40,
            }}
            position="top"
          />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
