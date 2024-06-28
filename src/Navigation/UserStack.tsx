import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationStrings from '../Utilities/Constants/NavigationStrings';
import * as screens from './index';

const Stack = createNativeStackNavigator();

export default function UserStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={NavigationStrings.UserProfile}
                component={screens.UserProfile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={NavigationStrings.EditProfile}
                component={screens.EditProfile}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
