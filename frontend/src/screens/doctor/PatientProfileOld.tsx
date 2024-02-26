import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

const Stack = createNativeStackNavigator();

function PatientProfile() {

    const [isModalVisible, setModalVisible] = useState(false);
    const [medicineName, setMedicineName] = useState('');
    const [date, setDate] = useState('');
    const [slot, setSlot] = useState('');
    const [beforeOrAfter, setBeforeOrAfter] = useState('');

    const handlePrescription = () => {
        setModalVisible(true);
    };

    const handleSavePrescription = () => {
        // Add logic to save prescription data
        setModalVisible(false);
    };

    // Dummy patient data (replace with actual data)
    const patientData = {
        name: 'sanjh',
        email: 'sanjh1209@gmail.com',
        points: 4,
    };

    return (

        <View style={styles.container}>


            <View style={styles.profileContainer}>
                {/* <View style={styles.profilePhotoContainer}>
                    <View style={styles.profilePhoto} >
                    </View>
    
                    <Text>User photo</Text>
                </View> */}
                <Text style={styles.title}>Patient Profile</Text>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{patientData.name}</Text>

                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{patientData.email}</Text>

                <Text style={styles.label}>Points:</Text>
                <Text style={styles.value}>{patientData.points}</Text>

                <TouchableOpacity style={styles.btn} onPress={handlePrescription}>
                    <Text style={styles.btnText}>Write Prescription</Text>
                </TouchableOpacity>
            </View>

            {/* Medication Modal */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Write Medication</Text>

                        {/* Medication Inputs */}
                        <TextInput
                            style={styles.input}
                            placeholder="Medicine Name"
                            value={medicineName}
                            onChangeText={text => setMedicineName(text)}
                        />
                        {/* <DateTimePicker
							value={date}
							mode="date"
							onChange={(event, newDate) => {
								if (event.type === 'set') {
									setDate(newDate || date);
								}
								setModalVisible(false);
							}}
						/> */}
                        <TextInput

                            style={styles.input}
                            placeholder="Date"
                            value={date}
                            onChangeText={text => setDate(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Slot"
                            value={slot}
                            onChangeText={text => setSlot(text)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Before/After"
                            value={beforeOrAfter}
                            onChangeText={text => setBeforeOrAfter(text)}
                        />

                        {/* Save Button */}
                        <TouchableOpacity style={styles.saveButton} onPress={handleSavePrescription}>
                            <Text style={styles.btnText}>Save Prescription</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#000'
    },
    profileContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    profilePhoto: {
        width: '100%',
        backgroundColor: 'red',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#000'
    },
    value: {
        fontSize: 16,
        marginBottom: 16,
        color: '#000'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    modalContent: {
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    saveButton: {
        backgroundColor: 'rgba(134, 65, 244, 1)',
        padding: 10,
        borderRadius: 5,
        marginTop: 16,
    },
    btn: {
        backgroundColor: 'rgba(134, 65, 244, 1)',
        padding: 10,
        height: 45,

        alignSelf: 'center',
        borderRadius: 5,
        width: '80%',
        marginTop: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 3,
    },
    btnText: {
        color: '#fff',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    userContainer: {
        flex: 1,
        borderRadius: 4,
        margin: 8,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(134, 65, 244, 1)'
    },
    userDetails: {
        fontSize: 18,
        color: '#FFFFFF',
    }
});

export default PatientProfile;