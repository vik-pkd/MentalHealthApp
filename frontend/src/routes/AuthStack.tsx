import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Signup from '../screens/Signup'
import Login from '../screens/Login'
import SignupDoctor from '../screens/SignupDoctor';
import LoginDoctor from '../screens/LoginDoctor';
import FaceLogin from '../screens/FaceLogin'
import FaceSignup from '../screens/FaceSignup'
import Launch from '../screens/Launch'
import LoginCaretaker from '../screens/LoginCaretaker'
import SignupCaretaker from '../screens/SignupCaretaker'

export type AuthStackParamList = {
  Launch: undefined;
  Login: undefined;
  Signup: undefined;
  LoginDoctor: undefined;
  SignupDoctor: undefined;
  LoginCaretaker: undefined;
  SignupCaretaker: undefined;
  FaceLogin: undefined;
  FaceSignup: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();


export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerShown: false
      }}>
      <Stack.Screen name="Launch" component={Launch} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="LoginDoctor" component={LoginDoctor} />
      <Stack.Screen name="SignupDoctor" component={SignupDoctor} />
      <Stack.Screen name="LoginCaretaker" component={LoginCaretaker} />
      <Stack.Screen name="SignupCaretaker" component={SignupCaretaker} />
      <Stack.Screen name="FaceLogin" component={FaceLogin} />
      <Stack.Screen name="FaceSignup" component={FaceSignup} />
    </Stack.Navigator>
  );
}