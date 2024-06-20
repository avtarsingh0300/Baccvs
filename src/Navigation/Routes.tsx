import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import {navigationRef} from './RootNavigation';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>{AuthStack(Stack)}</Stack.Navigator>
    </NavigationContainer>
  );
}
