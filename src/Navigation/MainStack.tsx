import 'react-native-gesture-handler';
import React from 'react';
import NavigationStrings from '../Utilities/Constants/NavigationStrings';
import TabRoutes from './TabRoutes';
import * as screens from './index';
export default function (Stack: any) {
  return (
    <>
      <Stack.Screen
        name={NavigationStrings.TabRoutes}
        component={TabRoutes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.EventFilter}
        component={screens.EventFilter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.Notification}
        component={screens.Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.Settings}
        component={screens.Settings}
        options={{headerShown: false}}
      />
    </>
  );
}
