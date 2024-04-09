import React from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleString('en-US', {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    return formattedTime;
};


interface PatientInfo {
    name: string;
    age: number;
    condition: string;
    profileImageUri: string;
}

interface MedicineInfo {
    doseIndex: number;
    medicine: string;
    prescriptionId: any;
    quantity: any;
    time: any;
}

interface FlatCardsVerticalProps {
    patientInfo: PatientInfo;
    medicineInfo: MedicineInfo[];
}

const FlatCardsVertical: React.FC<FlatCardsVerticalProps> = ({ patientInfo, medicineInfo }) => {
    const getTimeDetails = (time: Date) => {
        const currentTime = new Date();
        // Convert the reminder time from the reminder object to a Date object
        const reminderTime = new Date(time);
        // Compare the current time with the reminder time to determine the color
        const timeColor = currentTime < reminderTime ? 'green' : 'red';
        const alertEnabled = currentTime > reminderTime;

        return { timeColor, alertEnabled };
    };

    const handleAlert = (medName: any) => {
        // Handle alert logic here
        Alert.alert('Submit', 'Are you sure to submit the medicine', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => console.log(`Alert for medicine: ${medName}`) },
        ]);
    };


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
                {medicineInfo.map((med, index) => {
                    const { timeColor, alertEnabled } = getTimeDetails(med.time); // Logic for time color and alert

                    return (
                        <View key={index} style={[styles.card, styles.medicationCard]}>
                            <Text style={styles.medicationTitle}>{med.medicine}</Text>
                            <Text style={[styles.medDetail, { color: timeColor }]}>
                                Time: {formatDate(med.time)}
                            </Text>
                            {alertEnabled && (
                                <TouchableOpacity style={styles.alertButton} onPress={() => handleAlert(med.medicine)}>
                                    <Text style={styles.alertButtonText}>Alert</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    );
                })}
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