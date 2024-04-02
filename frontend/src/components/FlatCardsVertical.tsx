import React from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';

interface PatientInfo {
    name: string;
    age: number;
    condition: string;
    profileImageUri: string;
}

interface MedicineInfo {
    name: string;
    quantity: string;
    startDate: Date;
    startSlot: string;
    endDate: Date;
    endSlot: string;
}

interface FlatCardsVerticalProps {
    patientInfo: PatientInfo;
    medicineInfo: MedicineInfo[];
}

const FlatCardsVertical: React.FC<FlatCardsVerticalProps> = ({ patientInfo, medicineInfo }) => {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                {/* Patient Information Card */}
                <View style={[styles.card, styles.patientCard]}>
                    <Image source={require('../../assets/caretaker/patient.png')} style={styles.profileImage} />
                    <Text style={styles.nameText}>{patientInfo.name}</Text>
                    <Text style={styles.detailsText}>Age: {patientInfo.age}</Text>

                </View>

                {/* Medication Information Cards */}
                {medicineInfo.map((med, index) => (
                    <View key={index} style={[styles.card, styles.medicationCard]}>
                        <Text style={styles.medicationTitle}>{med.name}</Text>
                        <Text style={styles.medDetail}>Condition: {patientInfo.condition}</Text>
                        <Text style={styles.medDetail}>Quantity: {med.quantity}</Text>
                        <Text style={styles.medDetail}>
                            From: {med.startDate.toLocaleDateString()} {med.startSlot}
                        </Text>
                        <Text style={styles.medDetail}>
                            To: {med.endDate.toLocaleDateString()} {med.endSlot}
                        </Text>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
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
    },
    card: {
        borderRadius: 10,
        padding: 10,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 3, width: 0 },
        elevation: 3,
        alignItems: 'center'
    },
    patientCard: {
        backgroundColor: '#9C27B0', // Or your theme color
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
        backgroundColor: '#E1BEE7', // Or a lighter theme color
        flexGrow: 1,
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
});

export default FlatCardsVertical;