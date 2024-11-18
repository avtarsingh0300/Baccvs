import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './src/Navigation/Routes';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import {moderateScale, textScale} from './src/Utilities/Styles/responsiveSize';
import {AppState, LogBox, PermissionsAndroid, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import store from './src/Redux/store';
import fontFamily from './src/Utilities/Styles/fontFamily';
import {getUserData, sendUserStatus} from './src/Utilities/Constants/auth';
import Geolocation from '@react-native-community/geolocation';

LogBox.ignoreAllLogs();
const App = () => {
  useEffect(() => {
    // requestUserPermission();
    getUserData();

    SplashScreen.hide();
    if (Platform.OS === 'ios') {
      requestLocationPermissionIOS();
    } else {
      if (Platform.OS === 'android') {
        requestLocationPermission();
      }
    }
    // getTokenHandler();
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

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

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

  // async function onDisplayNotification() {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission();

  //   // Create a channel (required for Android)
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //   });

  // Display a notification
  //   await notifee.displayNotification({
  //     title: 'Notification Title',
  //     body: 'Main body content of the notification',
  //     android: {
  //       channelId,
  //       smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
  //       // pressAction is needed if you want the notification to open the app when pressed
  //       pressAction: {
  //         id: 'default',
  //       },
  //     },
  //   });
  // }

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
            position="top"
          />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
