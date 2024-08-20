import { StyleSheet, Text, View, ScrollView, Button, Modal, TextInput, TouchableOpacity, Image, Pressable, Dimensions } from 'react-native'
import { FAB } from '@rneui/themed'
import Snackbar from 'react-native-snackbar'
import React, { useState, useEffect } from 'react'
import globalStyles from '../../constants/styles'
import { useSelector } from 'react-redux';
import { useLogin } from '../../context/LoginProvider';
import FlatCardsVertical from '../../components/FlatCardsVertical'
import client from '../../api/client';
import AddMedicine from '../../components/AddMedicine';
import { Picker } from '@react-native-picker/picker';
import GameUploader from '../../components/doctor/GameUpload';
import AddGameCategory from '../../components/AddGameCategory';
import LinearGradient from 'react-native-linear-gradient';

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
    const screenHeight = Dimensions.get("window").height;

    const handleLogout = () => {

        setIsLoggedIn(false);
        Snackbar.show({
            text: 'Logout Successful',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#62a8c3',
            marginBottom: screenHeight - 44
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
        <LinearGradient
            colors={['#C485F7', '#C485F7', '#9459C6', '#9459C6', '#38006b']} // Adjust colors to match your design
            style={styles.backgroundGradient}
        >
            <ScrollView stickyHeaderIndices={[0]}>
                <View style={styles.stickyHeader}>
                    {profile && (
                        <View style={styles.userContainer}>
                            <Text style={styles.header}>Welcome {userCategory}!</Text>
                            <Text style={styles.userDetails}>How are you doing today, {profile.name}?</Text>
                            {/* <Text style={styles.userDetails}></Text> */}
                        </View>
                    )}
                </View>

                <Text style={styles.header}>Add Medicine</Text>
                <TouchableOpacity onPress={() => setAddMedicineModalVisible(true)} style={styles.card}>
                    <Image source={require('../../../assets/doctor/add_medicine.png')} style={styles.cardImage} />
                    <View style={styles.cardContent}>
                        {/* <Text style={styles.cardTitle}>Add Medicine</Text> */}
                        <Text style={styles.cardDescription}>Tap here to add a new medicine for future prescriptions.</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.header}>Register Patient</Text>
                <TouchableOpacity onPress={openAddPatientModal} style={styles.card}>
                    <Image source={require('../../../assets/doctor/add_patient.png')} style={styles.cardImage} />
                    <View style={styles.cardContent}>

                        <Text style={styles.cardDescription}>Tap here to add a new patient to your records.</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.header}>Add Game Category</Text>
                <TouchableOpacity onPress={() => setAddGameCategoryModalVisible(true)} style={styles.card}>
                    <Image source={require('../../../assets/doctor/add_category.png')} style={styles.cardImage} />
                    <View style={styles.cardContent}>

                        <Text style={styles.cardDescription}>Tap here to add a new game category.</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.header}>Add Game</Text>
                <TouchableOpacity onPress={() => setAddGameCategoryModalVisible(true)} style={styles.card}>
                    <Image source={require('../../../assets/doctor/add_game.png')} style={styles.cardImage} />
                    <View style={styles.cardContent}>

                        <Text style={styles.cardDescription}>Tap here to upload a new game.</Text>
                    </View>
                </TouchableOpacity>


                {/* <View>
                    <GameUploader />
                </View> */}

                {/* Add Patient Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isAddPatientModalVisible}
                    onRequestClose={closeAddPatientModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={[globalStyles.lightText, styles.modalTitle]}>Write Patient Details</Text>

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
                color='#6A1B9A'
                size="large"
                title="Logout"
                icon={{ name: 'logout', color: '#FFFFFF' }}
                onPress={handleLogout}
            />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    backgroundGradient: {
        flex: 1,
    },
    continer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    stickyHeader: {
        backgroundColor: '#6A1B9A', // Or any other color matching your theme
        marginBottom: 8
    },
    header: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 20,
        marginHorizontal: 8,
        marginVertical: 4,
    },
    smallText: {
        color: '#000000'
    },
    userContainer: {
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#6A1B9A', // Or any other color matching your theme
    },
    userDetails: {
        fontSize: 14,
        color: '#f4f1f4',
        marginBottom: 8
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
        borderColor: '#f4f1f4',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#f4f1f4', // Deep purple background color
        borderRadius: 6,
        padding: 10,
        justifyContent: 'flex-start', // Align to the start of the container
        alignItems: 'center', // Center items vertically
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 8,
        marginBottom: 8
    },
    cardImage: {
        width: 80,
        height: 80,
        marginRight: 16,
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 10,
    },
    cardDescription: {
        fontSize: 14,
        color: '#38006b',
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
        color: '#f4f1f4',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    label: {
        fontSize: 16,
        color: '#f4f1f4',
        paddingBottom: 8,
        // Add any other styling you need for the label
    },
    pickerContainer: {
        borderColor: '#f4f1f4',
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