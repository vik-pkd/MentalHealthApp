import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PatientSerachStackParamList } from '../../routes/DoctorStack'
import client from '../../api/client';
import { useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MedicinePrescriptionDisplay from '../../components/doctor/MedicinePrescriptionDisplay';
import FancyCard from '../../components/FancyCard';
import BasicCard from '../../components/BasicCard';
import PrescriptionTabs from '../../routes/PrescriptionTabs';
import AssignGameModal from '../../components/AssignGameModal';
import LinearGradient from 'react-native-linear-gradient';


type PatientProfileScreenRouteProp = RouteProp<
    PatientSerachStackParamList,
    'PatientProfile'
>;

type PatientProfileProps = {
    route: PatientProfileScreenRouteProp;
};

type PatientProfileParamsList = NativeStackScreenProps<PatientSerachStackParamList, 'PatientProfile'>;

const Tab = createMaterialTopTabNavigator();

const PatientProfile = ({ navigation }: PatientProfileParamsList) => {
    const route = useRoute<RouteProp<PatientSerachStackParamList>>();
    const params = route.params;
    const authToken = useSelector((state: Record<string, { token: string | null }>) => state.authToken.token);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);
    const [isMedicineModalVisible, setIsMedicineModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const headers = {
                'Authorization': `Bearer ${authToken}`
            };
            const response = await client.get(`/patients/patient/${params!._id}`, { headers });
            // console.log(response.data);
            const data = response.data.data;
            if (data) {
                setName(data.name);
                setEmail(data.email);
                setAge(data.age);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <LinearGradient
                colors={['#C485F7', '#C485F7', '#9459C6', '#9459C6', '#662F97']} // Adjust colors to match your design
                style={styles.backgroundGradient}
            >

                <View style={styles.userInfo}>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.infoKey}>Name:</Text>
                        <Text style={styles.infoValue}>{name}</Text>
                    </View>

                    <View style={styles.userInfoItem}>
                        <Text style={styles.infoKey}>Email:</Text>
                        <Text style={styles.infoValue}>{email}</Text>
                    </View>

                    <View style={styles.userInfoItem}>
                        <Text style={styles.infoKey}>Age:</Text>
                        <Text style={styles.infoValue}>{age}</Text>
                    </View>
                </View>


                {/* <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={() => navigation.navigate('Prescription', { _id: params!._id })}
                        style={styles.addModalButton}
                    >
                        <Text style={styles.buttonText}>Add Medicine</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => setIsMedicineModalVisible(true)}
                        style={styles.addModalButton}
                    >
                        <Text style={styles.buttonText}>Add Activities</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setIsGameModalVisible(true)}
                        style={styles.addModalButton}
                    >
                        <Text style={styles.buttonText}>Add Game</Text>
                    </Pressable>
                </View> */}
                {/* <AssignGameModal isVisible={isGameModalVisible} onRequestClose={() => setIsGameModalVisible(false)} patientId={params!._id} /> */}
            </LinearGradient>

            <PrescriptionTabs patientId={params!._id} />
        </>
    );
};

export default PatientProfile;

const styles = StyleSheet.create({
    backgroundGradient: {
        // flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    infoKey: {
        fontSize: 16,
        color: '#38006b', // Purple text color for the key
        fontWeight: 'bold',
    },
    infoValue: {
        fontSize: 16,
        color: 'black', // Slightly darker purple text color for the value
    },
    userInfo: {
        width: '90%',
        padding: 10,
        borderRadius: 8,
        margin: 16,
        backgroundColor: 'white', // White card background
        shadowColor: '#000', // Shadow for the card
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    userInfoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8, // Adds margin vertically inside the card
    },
    addModalButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: 'rgba(134, 65, 244, 1)', // Purple background color for the button
        elevation: 2,
    },
    buttonText: {
        fontSize: 18,
        color: 'white', // White text color for the button
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        // marginBottom: 8,
        marginHorizontal: 8
    },
    prescriptionContainer: {
        width: '90%',
        padding: 10,
        borderRadius: 8,
        margin: 16,
        backgroundColor: 'white', // White card background
        shadowColor: '#000', // Shadow for the card
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});