import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import Bussines from '../screens/Bussines'; // Ensure this file exists and is correctly named

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Bussines" component={Bussines} /> {/* Ensure this screen is defined properly */}
    </Stack.Navigator>
  );
}
