import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from './screens/Home';
import Games from './screens/Games';
import Mindfulness from './screens/Mindfulness';

const homeName = "Home";
const detailsName = "Games";
const settingsName = "Mindfulness";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'rgba(134, 65, 244, 1)',
          tabBarInactiveTintColor: 'gray',
        })}
      >

        <Tab.Screen name='Games' component={Games} />
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Mindfulness' component={Mindfulness} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}