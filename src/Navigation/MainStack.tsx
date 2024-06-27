import 'react-native-gesture-handler';
import React from 'react';
import NavigationStrings from '../Utilities/Constants/NavigationStrings';
import TabRoutes from './TabRoutes';
import EventFilter from '../Screens/EventFilter';

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
        component={EventFilter}
        options={{headerShown: false}}
      />
    </>
  );
}
