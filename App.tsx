import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './src/Navigation/Routes';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import {moderateScale, textScale} from './src/Utilities/Styles/responsiveSize';
import {Alert, LogBox, PermissionsAndroid, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import store from './src/Redux/store';
import fontFamily from './src/Utilities/Styles/fontFamily';
import {getUserData} from './src/Utilities/Constants/auth';
import Geolocation from '@react-native-community/geolocation';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
LogBox.ignoreAllLogs();
const App = () => {
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

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
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
        </GestureHandlerRootView>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
