import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/patient/Home';
import Games from '../screens/patient/Games';
import Mindfulness from '../screens/patient/Mindfulness';
import Puzzle from '../screens/patient/Puzzle';
import Concentration from '../screens/patient/Concentration';
import TicTacToe from '../screens/patient/Games/TicTacToe';
// Import other game screens here

// navigation/types.ts
export type GameStackParamList = {
  Games: undefined;
  Puzzle: undefined;
  Concentration: undefined;
  TicTacToe: undefined;
  // Define other screens with their parameters here
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<GameStackParamList>();

const GameStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerShown: false
    }}>
      <Stack.Screen name="Games" component={Games} />
      <Stack.Screen name="Puzzle" component={Puzzle} />
      <Stack.Screen name="Concentration" component={Concentration} />
      <Stack.Screen name="TicTacToe" component={TicTacToe} />
      {/* Add other game screens as Stack.Screen here */}
    </Stack.Navigator>
  );
};

export const PatientStack: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = '';
            if (route.name === "Home") {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === "Game Menu") {
              iconName = focused ? 'game-controller' : 'game-controller-outline';
            } else if (route.name === "Mindfulness") {
              iconName = focused ? 'happy' : 'happy-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'rgba(134, 65, 244, 1)',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })}
      >
        <Tab.Screen name="Game Menu" component={GameStack} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Mindfulness" component={Mindfulness} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
