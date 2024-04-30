import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/patient/Home';
import Games from '../screens/patient/Games';
import Mindfulness from '../screens/patient/Mindfulness';

import Puzzle from '../screens/patient/Puzzle';
import Focus from '../screens/patient/Focus';
import Memory from '../screens/patient/Memory';

import TicTacToe from '../screens/patient/Games/TicTacToe';
import CardMatch from '../screens/patient/Games/CardMatch';
import Strategy from '../screens/patient/Strategy';
import Coordination from '../screens/patient/Coordination';
import Casual from '../screens/patient/Casual';
import FruitSlicer from '../screens/patient/Games/FruitSlicer';
import RockPaperScissors from '../screens/patient/Games/RockPaperScissors';
import TwoZero from '../screens/patient/Games/2048';
import Hangman from '../screens/patient/Games/Hangman';
import PingPong from '../screens/patient/Games/PingPong';
import CrossRoad from '../screens/patient/Games/CrossRoad';
import Snake from '../screens/patient/Games/Snake';
import Quiz from '../screens/patient/Games/Quiz';
import Slot from '../screens/patient/Games/Slot';
import Tower from '../screens/patient/Games/Tower';
import Meditation from '../screens/patient/Meditation';
import { SafeAreaView } from 'react-native-safe-area-context';
import Journey from '../screens/patient/Journey/Journey';
import Journal from '../screens/patient/Journal/Journal';
// Import other game screens here

// navigation/types.ts
export type GameStackParamList = {
  Games: undefined;

  // Game Types Here
  Puzzle: undefined;
  Focus: undefined;
  Strategy: undefined;
  Memory: undefined;
  Coordination: undefined;
  Casual: undefined;

  // Games screens, this stack can be moved to individual screens
  TicTacToe: undefined;
  CardMatch: undefined;
  Quiz: undefined;
  FruitSlicer: undefined;
  RockPaperScissors: undefined;
  TwoZero: undefined;
  Hangman: undefined;
  PingPong: undefined;
  CrossRoad: undefined;
  Snake: undefined;
  Slot: undefined;
  Tower: undefined;

};

export type MindStackParamList = {
  Mindfulness: undefined;
  Meditation: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<GameStackParamList>();
const MStack = createNativeStackNavigator<MindStackParamList>();

const GameStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerShown: false
    }}>
      <Stack.Screen name="Games" component={Games} />

      <Stack.Screen name="Puzzle" component={Puzzle} />
      <Stack.Screen name="Focus" component={Focus} />
      <Stack.Screen name="Strategy" component={Strategy} />
      <Stack.Screen name="Memory" component={Memory} />
      <Stack.Screen name="Coordination" component={Coordination} />
      <Stack.Screen name="Casual" component={Casual} />

      {/* Puzzle */}
      <Stack.Screen name="Slot" component={Slot} />
      <Stack.Screen name="Tower" component={Tower} />

      {/* Focus */}

      {/* Strategy */}
      <Stack.Screen name="TicTacToe" component={TicTacToe} />
      <Stack.Screen name="TwoZero" component={TwoZero} />
      <Stack.Screen name="Hangman" component={Hangman} />
      {/* Can add sudoku here! */}

      {/* Memory */}
      <Stack.Screen name="CardMatch" component={CardMatch} />
      <Stack.Screen name="Quiz" component={Quiz} />

      {/* Coordination */}
      <Stack.Screen name="PingPong" component={PingPong} />
      <Stack.Screen name="CrossRoad" component={CrossRoad} />
      <Stack.Screen name="Snake" component={Snake} />

      {/* Casual */}
      <Stack.Screen name="FruitSlicer" component={FruitSlicer} />
      <Stack.Screen name="RockPaperScissors" component={RockPaperScissors} />
    </Stack.Navigator>
  );
};

const MindStack: React.FC = () => {
  return (
    <MStack.Navigator screenOptions={{
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerShown: false
    }}>
      <MStack.Screen name="Mindfulness" component={Mindfulness} />
      <MStack.Screen name="Meditation" component={Meditation} />

    </MStack.Navigator>
  );
};


export const PatientStack: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          initialRouteName="Profile"

          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string = '';
              if (route.name === "Profile") {
                iconName = focused ? 'accessibility' : 'accessibility-outline';
              } else if (route.name === "Games Hub") {
                iconName = focused ? 'game-controller' : 'game-controller-outline';
              } else if (route.name === "Journey") {
                iconName = focused ? 'map' : 'map-outline';
              } else if (route.name === "Zen") {
                iconName = focused ? 'happy' : 'happy-outline';
              } else if (route.name === "Log") {
                iconName = focused ? 'pencil' : 'pencil-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#cc4dbd',
            tabBarInactiveTintColor: 'white',
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#6a1b9a', // Background color of the tab bar
              paddingBottom: 2,
            },
          })}
        >
          <Tab.Screen name="Games Hub" component={GameStack} />
          <Tab.Screen name="Journey" component={Journey} />
          <Tab.Screen name="Profile" component={Home} />
          <Tab.Screen name="Zen" component={MindStack} />
          <Tab.Screen name="Log" component={Journal} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
