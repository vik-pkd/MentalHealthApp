import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Signup from '../screens/auth/Signup'
import Login from '../screens/auth/Login'
import SignupDoctor from '../screens/auth/SignupDoctor';
import LoginDoctor from '../screens/auth/LoginDoctor';
import FaceLogin from '../screens/auth/FaceLogin'
import FaceSignup from '../screens/auth/FaceSignup'
import Launch from '../screens/Launch'
import LoginCaretaker from '../screens/auth/LoginCaretaker'
import SignupCaretaker from '../screens/auth/SignupCaretaker'

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