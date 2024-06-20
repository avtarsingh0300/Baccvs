import 'react-native-gesture-handler';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './src/Navigation/Routes';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import {moderateScale, textScale} from './src/Utilities/Styles/responsiveSize';
import {LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

LogBox.ignoreAllLogs();
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    // <Provider store={store}>
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <Routes />
        <FlashMessage
          titleStyle={{
            marginRight: moderateScale(5),

            fontSize: textScale(12),
          }}
          position="top"
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
    // </Provider>
  );
};

export default App;
