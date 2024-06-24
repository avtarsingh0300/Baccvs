import 'react-native-gesture-handler';
import React from 'react';
import NavigationStrings from '../Utilities/Constants/NavigationStrings';
import * as screens from './index';

export default function (Stack: any) {
  return (
    <>
      <Stack.Screen
        name={NavigationStrings?.WelcomScreen}
        component={screens?.WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings?.LoginScreen}
        component={screens?.LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings?.ReferalCode}
        component={screens?.ReferalCode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings?.PhoneNumber}
        component={screens?.PhoneNumber}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings?.OtpVerification}
        component={screens?.OtpVerification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings?.RegisterScreen}
        component={screens?.RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings?.UploadImage}
        component={screens?.UploadImage}
        options={{headerShown: false}}
      />
    </>
  );
}
