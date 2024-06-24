import 'react-native-gesture-handler';
import React from 'react';
import NavigationStrings from '../Utilities/Constants/NavigationStrings';
import TabRoutes from './TabRoutes';

export default function (Stack: any) {
  return (
    <>
      <Stack.Screen
        name={NavigationStrings.TabRoutes}
        component={TabRoutes}
        options={{headerShown: false}}
      />
    </>
  );
}
