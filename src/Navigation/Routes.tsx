import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import { navigationRef } from './RootNavigation';
import MainStack from './MainStack';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const userData = useSelector((data: object) => data?.auth?.userData);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {(userData != null && userData?.token) ?
          MainStack(Stack) :
          AuthStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
