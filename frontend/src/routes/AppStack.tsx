import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from '../screens/Home';
import Games from '../screens/Games';
import Mindfulness from '../screens/Mindfulness';
import PatientSearch from '../screens/PatientSearch';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientProfile from '../screens/PatientProfile';
import AddPrescription from '../components/addPrescription';
import MedicineInfo from '../components/addPrescription/MedicineInfo';

const homeName = "Home";
const detailsName = "Games";
const settingsName = "Mindfulness";
const patientsName = "Patients";

const Tab = createBottomTabNavigator();

export type PatientSerachStackParamList = {
  PatientSearch: undefined;
  PatientProfile: { _id: string };
  Prescription: { _id: string };
}

const Stack = createNativeStackNavigator<PatientSerachStackParamList>();

const PatientStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='PatientSearch' component={PatientSearch} />
      <Stack.Screen name='PatientProfile' component={PatientProfile} />
      <Stack.Screen name='Prescription' component={AddPrescription} />
    </Stack.Navigator>
  );
};

export const AppStack = () => {
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
            } else if (rn === patientsName) {
              iconName = focused ? 'person' : 'person-outline';
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
        <Tab.Screen name='Patients' component={PatientStack}>
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  )
}