import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from '../screens/patient/Home';
import Games from '../screens/patient/Games';
import Mindfulness from '../screens/patient/Mindfulness';

const homeName = "Home";
const detailsName = "Games";
const settingsName = "Mindfulness";

const Tab = createBottomTabNavigator();

export const PatientStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'game-controller' : 'game-controller-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'happy' : 'happy-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'rgba(134, 65, 244, 1)',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })}
      >

        <Tab.Screen name='Games' component={Games} />
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Mindfulness' component={Mindfulness} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}