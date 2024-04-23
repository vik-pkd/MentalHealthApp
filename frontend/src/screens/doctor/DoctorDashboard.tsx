import { StyleSheet, Text, View, ScrollView, Button, Modal, TextInput, TouchableOpacity, Image, Pressable } from 'react-native'
import { FAB } from '@rneui/themed'
import Snackbar from 'react-native-snackbar'
import React, { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLogin } from '../../context/LoginProvider';
import FlatCardsVertical from '../../components/FlatCardsVertical'
import client from '../../api/client';
import AddMedicine from '../../components/AddMedicine';
import { Picker } from '@react-native-picker/picker';
import GameUploader from '../../components/doctor/GameUpload';
import AddGameCategory from '../../components/AddGameCategory';

type UserObj = {
    name: String;
    email: String;
}

// Define the type for a caregiver object based on your backend structure.
type CaregiverObj = {
    _id: string;
    name: string;
    // add other fields as needed
}

export default function DoctorDashboard() {
    const { setIsLoggedIn, profile, userCategory } = useLogin();
    const authToken = useSelector((state: Record<string, { token: string | null }>) => state.authToken.token);
    const handleLogout = () => {

        setIsLoggedIn(false);
        Snackbar.show({
            text: 'Logout Successful',
            duration: Snackbar.LENGTH_SHORT
        });

    }

    // Existing code...
    const [isAddPatientModalVisible, setAddPatientModalVisible] = useState(false);
    const [isAddMedicineModalVisible, setAddMedicineModalVisible] = useState(false);
    const [isAddGameCategoryModalVisible, setAddGameCategoryModalVisible] = useState(false);
    const [patientName, setPatientName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState<string>('');
    const [caregivers, setCaregivers] = useState<CaregiverObj[]>([]);
    const [selectedCaregiver, setSelectedCaregiver] = useState<string>('');


    // Function to handle opening the add patient modal
    const openAddPatientModal = () => {
        setAddPatientModalVisible(true);
    };

    // Function to handle closing the add patient modal
    const closeAddPatientModal = () => {
        setAddPatientModalVisible(false);
    };

    const fetchCaregivers = async () => {
        try {
            // Assuming 'client' is your configured Axios instance with baseURL set to your server
            const response = await client.get('/caregivers/get-caregivers');
            setCaregivers(response.data);
        } catch (err) {
            // Handle the error as needed
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCaregivers();
    }, []);

    const handleAddPatient = async () => {

        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json', // This is important for your server to understand the incoming data
        };

        const patientData = {
            doctorid: profile._id,
            caregiverid: selectedCaregiver,
            name: patientName,
            email: email,
            password: password, // Make sure your server is setup to handle password securely
            age: age
        };

        console.log(patientData)

        // Replace 'url-to-your-server' with your actual server URL and endpoint
        const response = await client.post(`/patients/add-patient`, patientData, { headers });
        console.log(response.data)
        if (response.data.status === 'success') {
            // Handle the success scenario, maybe close the modal and clear the fields
            closeAddPatientModal();
            setPatientName('');
            setEmail('');
            setPassword('');
            setAge('');
            // Show success message
            Snackbar.show({
                text: 'Patient added successfully',
                duration: Snackbar.LENGTH_SHORT
            });
        } else {
            // Handle the failure scenario
            setError(response.data.message);
        }
    }

    return (
        <View>
            <ScrollView>
                {profile && (
                    <View style={styles.userContainer}>
                        <Text style={styles.userDetails}>Type: {userCategory}</Text>
                        <Text style={styles.userDetails}>Name: {profile.name}</Text>
                        <Text style={styles.userDetails}>Email: {profile.email}</Text>
                    </View>
                )}
                <TouchableOpacity onPress={() => setAddMedicineModalVisible(true)} style={styles.card}>
                    <Image source={require('../../add_medicine.png')} style={styles.cardImage} />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>Add Medicine</Text>
                        <Text style={styles.cardDescription}>Tap here to add a new medicine for future prescriptions.</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={openAddPatientModal} style={styles.card}>
                    <Image source={require('../../patient.jpg')} style={styles.cardImage} />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>Add Patient</Text>
                        <Text style={styles.cardDescription}>Tap here to add a new patient to your records.</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAddGameCategoryModalVisible(true)} style={styles.card}>
                    <Image source={require('../../patient.jpg')} style={styles.cardImage} />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>Add Game Category</Text>
                        <Text style={styles.cardDescription}>Tap here to add a new game category.</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <GameUploader />
                </View>

                {/* Add Patient Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isAddPatientModalVisible}
                    onRequestClose={closeAddPatientModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Write Patient Details</Text>

                            {/* Medication Inputs */}
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                value={patientName}
                                onChangeText={text => setPatientName(text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={text => setEmail(text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                value={password}
                                onChangeText={text => setPassword(text)}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Age"
                                value={age}
                                onChangeText={text => setAge(text)}
                            />


                            {/* Caregivers Picker */}
                            {caregivers.length > 0 && (
                                <>
                                    <Text style={styles.label}>Assign Caregiver:</Text>
                                    <View style={styles.pickerContainer}>
                                        <Picker
                                            selectedValue={selectedCaregiver}
                                            onValueChange={(itemValue) => setSelectedCaregiver(itemValue)}
                                            style={styles.picker}
                                        >
                                            {caregivers.map((caregiver) => (
                                                <Picker.Item key={caregiver._id} label={caregiver.name} value={caregiver._id} />
                                            ))}
                                        </Picker>
                                    </View>
                                </>
                            )}

                            <Pressable
                                onPress={handleAddPatient}
                                style={[styles.btn, { marginTop: error ? 10 : 20 }]}>
                                <Text style={styles.btnText}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <AddMedicine
                    isVisible={isAddMedicineModalVisible}
                    onRequestClose={() => setAddMedicineModalVisible(false)}
                />
                <AddGameCategory
                    isVisible={isAddGameCategoryModalVisible}
                    onRequestClose={() => setAddGameCategoryModalVisible(false)}
                />

                {/* <Text style={styles.cardTitle}>Past Appointments</Text> */}
                {/* <FlatCardsVertical />
                <FlatCardsVertical />
                <FlatCardsVertical />
                <FlatCardsVertical />
                <FlatCardsVertical />
                <FlatCardsVertical /> */}

            </ScrollView>
            <FAB
                placement="right"
                color='rgba(134, 65, 244, 1)'
                size="large"
                title="Logout"
                icon={{ name: 'logout', color: '#FFFFFF' }}
                onPress={handleLogout}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    continer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    smallText: {
        color: '#000000'
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
        fontSize: 14,
        color: '#FFFFFF',
    },
    cardTitle: {
        color: '#000000',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
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
        alignSelf: 'center'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        margintop: 4,
        marginHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardImage: {
        width: 80,
        height: 80,
        margin: 10,
        borderRadius: 40,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 10,
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
    },
    btn: {
        backgroundColor: 'rgba(134, 65, 244, 1)',
        padding: 10,
        height: 45,
        alignSelf: 'center',
        borderRadius: 5,
        width: '80%',
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
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    label: {
        fontSize: 16,
        color: '#666',
        padding: 8,
        // Add any other styling you need for the label
    },
    pickerContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        paddingBottom: 16,
        borderRadius: 1,
        marginBottom: 12,
    },
    picker: {
        height: 40,
        width: '100%',
    },
})