import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './src/Navigation/Routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import { moderateScale, textScale } from './src/Utilities/Styles/responsiveSize';
import { Alert, LogBox, PermissionsAndroid, Platform, } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import fontFamily from './src/Utilities/Styles/fontFamily';
import { getUserData } from './src/Utilities/Constants/auth';
import Geolocation from '@react-native-community/geolocation';

LogBox.ignoreAllLogs();
const App = () => {
  useEffect(() => {
    getUserData();
    // requestLocationPermission();
    SplashScreen.hide();
  }, []);


  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      // Geolocation.requestAuthorization('whenInUse');
      console.log("granted ios");
      getLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("granted");
          getLocation();
        } else {
          Alert.alert('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position, " " + Platform.OS);
      },
      (error) => {
        console.log(error.code, error.message);
        Alert.alert('Error', 'Error getting location');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
  );
};

export default App;
