import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import InsideScreen from './InsideScreen';
import RootStackParamList from './AppNavigator';


export type RootStackParamList = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  InsideScreen: undefined;
};


const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="InsideScreen" component={InsideScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
