import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import {navigationRef} from './RootNavigation';
import MainStack from './MainStack';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const user = useSelector((data: object) => data?.auth?.userData);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {user != null && user?.token ? MainStack(Stack) : AuthStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
