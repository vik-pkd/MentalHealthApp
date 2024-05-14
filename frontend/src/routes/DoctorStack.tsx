import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'

import PatientProfile from '../screens/doctor/PatientProfile';
import PatientSearch from '../screens/doctor/PatientSearch';
import DoctorDashboard from '../screens/doctor/DoctorDashboard';
import AddPrescription from '../components/addPrescription';
import Activities from '../components/doctor/Activities';

const homeName = "Dashboard";
const detailsName = "Patients";
const settingsName = "Medication";

const Tab = createBottomTabNavigator();

export type PatientSerachStackParamList = {
    PatientSearch: undefined;
    PatientProfile: { _id: string };
    Prescription: { _id: string };
    Activities: { _id: string };
}

const Stack = createNativeStackNavigator<PatientSerachStackParamList>();

const PatientStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerShown: false
        }}>
            <Stack.Screen name='PatientSearch' component={PatientSearch} />
            <Stack.Screen name='PatientProfile' component={PatientProfile} />
            <Stack.Screen name='Prescription' component={AddPrescription} />
            <Stack.Screen name='Activities' component={Activities} />
        </Stack.Navigator>
    );
};

export const DoctorStack = () => {
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
                    tabBarActiveTintColor: '#62a8c3',
                    tabBarInactiveTintColor: 'white',
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#6a1b9a', // Background color of the tab bar
                        paddingBottom: 2,
                    },
                })}
            >

                <Tab.Screen name='Patients' component={PatientStack} />
                <Tab.Screen name='Dashboard' component={DoctorDashboard} />
                {/* <Tab.Screen name='Medication' component={PatientProfile} /> */}
            </Tab.Navigator>
        </NavigationContainer>
    )
}