import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'

import PatientProfile from '../screens/doctor/PatientProfile';
import PatientSearch from '../screens/doctor/PatientSearch';
import CaretakerDashboard from '../screens/caretaker/CaretakerDashboard';

const homeName = "Dashboard";
const detailsName = "Patients";
const settingsName = "Medication";

const Tab = createBottomTabNavigator();

export type PatientSerachStackParamList = {
    PatientSearch: undefined;
    PatientProfile: { _id: string };
}

const Stack = createNativeStackNavigator<PatientSerachStackParamList>();

const PatientStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='PatientSearch' component={PatientSearch} />
            <Stack.Screen name='PatientProfile' component={PatientProfile} />
        </Stack.Navigator>
    );
};

export const CaretakerStack = () => {
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
                            iconName = focused ? 'accessibility' : 'accessibility-outline';

                        } else if (rn === settingsName) {
                            iconName = focused ? 'pulse' : 'pulse-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'rgba(134, 65, 244, 1)',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false
                })}
            >

                <Tab.Screen name='Patients' component={PatientStack} />
                <Tab.Screen name='Dashboard' component={CaretakerDashboard} />
                <Tab.Screen name='Medication' component={PatientProfile} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}