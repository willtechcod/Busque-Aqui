import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Preload from '../pages/Preload';
import Home from '../pages/Home';

const Stack = createNativeStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName='Preload'
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name='Preload' component={Preload} />
        <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
);