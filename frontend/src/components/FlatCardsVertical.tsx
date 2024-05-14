import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import client from '../api/client';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleString('en-US', {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    return formattedTime;
};


interface CaregiverInfo {
    _id: string;
}

interface PatientInfo {
    _id: string;
    name: string;
    age: number;
    condition: string;
}

interface MedicineInfo {
    doseIndex: number;
    medicine: string;
    prescriptionId: any;
    quantity: any;
    time: any;
}

interface FlatCardsVerticalProps {
    caregiverInfo: CaregiverInfo;
    patientInfo: PatientInfo;
    medicineInfo: MedicineInfo[];
}

interface AlertState {
    [key: string]: boolean;
}

const FlatCardsVertical: React.FC<FlatCardsVerticalProps> = ({ caregiverInfo, patientInfo, medicineInfo }) => {

    const [alertSent, setAlertSent] = useState<boolean[]>([]);

    const getTimeDetails = (time: Date) => {
        const currentTime = new Date();
        // Convert the reminder time from the reminder object to a Date object
        const reminderTime = new Date(time);
        // Compare the current time with the reminder time to determine the color
        const timeColor = currentTime < reminderTime ? 'green' : 'red';
        const alertEnabled = currentTime > reminderTime;

        // setAlertEnabled(alertEnabled);
        return { timeColor, alertEnabled };
    };

    const addAlert = async (prescriptionId: any, patientId: any, caregiverId: any, index: number) => {
        console.log('Prescription ID : ', prescriptionId);
        console.log('Patient ID : ', patientId);
        console.log('Caregiver ID : ', caregiverId);

        const data = {
            prescriptionId: prescriptionId,
            patientId: patientId,
            caregiverId: caregiverId
        }

        const response = await client.post('/caregivers/add-alert', data);
        console.log(response.data);

        if (response.data.status == 'success') {
            const updatedAlerts = [...alertSent];
            updatedAlerts[index] = true;
            setAlertSent(updatedAlerts);
        }
    }

    const handleAlert = (prescriptionId: any, patientId: any, caregiverId: any, index: number) => {
        // Handle alert logic here
        Alert.alert('Submit', 'Are you sure to submit the medicine', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => addAlert(prescriptionId, patientId, caregiverId, index) },
        ]);
    };

    useEffect(() => {
        // Reset alertSent state to match the current length of medicineInfo
        setAlertSent(new Array(medicineInfo.length).fill(false));
    }, [medicineInfo]);

    return (
        <View style={styles.container}>
            {/* Patient Information Card */}
            <View style={[styles.card, styles.patientCard]}>
                <Image source={require('../../assets/caretaker/patient.png')} style={styles.profileImage} />
                <Text style={styles.nameText}>{patientInfo.name}</Text>
                <Text style={styles.detailsText}>Age: {patientInfo.age}</Text>

            </View>

            {/* Medication Information Cards */}
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
                {medicineInfo.length > 0 ? (
                    medicineInfo.map((med, index) => {
                        const { timeColor, alertEnabled } = getTimeDetails(med.time); // Logic for time color and alert
                        const isAlerted = alertSent[index];

                        return (
                            <View key={index} style={[styles.card, styles.medicationCard]}>
                                <Text style={styles.medicationTitle}>{med.medicine}</Text>
                                <Text style={[styles.medDetail, { color: timeColor }]}>
                                    Time: {formatDate(med.time)}
                                </Text>
                                {alertEnabled && (
                                    <TouchableOpacity style={isAlerted ? styles.greenAlertButton : styles.alertButton}
                                        onPress={() => !isAlerted && handleAlert(med.prescriptionId, patientInfo._id, caregiverInfo._id, index)}>
                                        <Text style={styles.alertButtonText}>{isAlerted ? 'Alerted' : 'Alert'}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    })
                ) : (
                    <View style={styles.noMedicationContainer}>
                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 16 }}>No medication information available!!!</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around',
        margin: 4,
        backgroundColor: '#ce93d8',
        borderRadius: 10,
        height: 190
    },
    card: {
        borderRadius: 10,
        padding: 10,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 3, width: 0 },
        elevation: 3,
        alignItems: 'center',
    },
    noMedicationContainer: {
        backgroundColor: '#38006b',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'space-evenly',
        // shadowOpacity: 0.1,
        // shadowRadius: 10,
        // shadowColor: '#000',
        // shadowOffset: { height: 1, width: 0 },
        // elevation: 3,
        alignItems: 'center',
        height: 170
    },
    patientCard: {
        backgroundColor: '#9C27B0', // Or your theme color
        marginRight: 8
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 10,
    },
    nameText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    detailsText: {
        color: '#fff',
        fontSize: 14,
    },
    medicationCard: {
        backgroundColor: '#E1BEE7',
        marginVertical: 5, // Add spacing between cards
    },
    medicationTitle: {
        color: '#4A148C', // Darker theme color for contrast
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    medicationDetail: {
        backgroundColor: '#F3E5F5', // Even lighter shade
        borderRadius: 5,
        marginBottom: 5,
        padding: 5,
    },
    medName: {
        color: '#4A148C',
        fontSize: 16,
        fontWeight: 'bold',
    },
    medDetail: {
        color: '#6A1B9A',
        fontSize: 14,
    },
    alertButton: {
        backgroundColor: 'red', // Or your theme color for buttons
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    greenAlertButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    alertButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    scrollView: {
        // You can set a maximum height to constrain the scroll view, if needed
        maxHeight: 300, // or whatever height you desire
    },
});

export default FlatCardsVertical;