import { StyleSheet, Text, View, ScrollView, Image, Animated, Modal, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import FancyCard from '../../components/FancyCard'
import BasicCard from '../../components/BasicCard'
import HistoryCard from '../../components/HistoryCards'
import { FAB } from '@rneui/themed'
import Snackbar from 'react-native-snackbar'
import React, { useContext, useState, useEffect, useRef } from 'react'
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import client from '../../api/client'

//context API
import { useLogin } from '../../context/LoginProvider';
import FlatCardsVertical from '../../components/FlatCardsVertical'


export default function CaretakerDashboard() {
    const { setIsLoggedIn, profile } = useLogin();
    const [patients, setPatients] = useState([]);
    const [reminders, setReminders] = useState([[]]);

    const screenHeight = Dimensions.get("window").height;

    // Dummy patient information
    const patientInfo = {
        name: 'John Doe',
        age: 54,
        condition: 'Hypertension',
        profileImageUri: 'https://via.placeholder.com/70', // Replace with actual image URI
    };

    // Dummy medication information array
    const medicineInfo = [
        {
            name: 'Medicine A',
            quantity: '2 Pills',
            startDate: new Date(2024, 3, 14, 8, 0), // April 14, 2024, 08:00 AM
            startSlot: 'Morning',
            endDate: new Date(2024, 3, 21, 20, 0), // April 21, 2024, 08:00 PM
            endSlot: 'Evening',
        },
        {
            name: 'Medicine A',
            quantity: '2 Pills',
            startDate: new Date(2024, 3, 14, 8, 0), // April 14, 2024, 08:00 AM
            startSlot: 'Morning',
            endDate: new Date(2024, 3, 21, 20, 0), // April 21, 2024, 08:00 PM
            endSlot: 'Evening',
        },
        {
            name: 'Medicine A',
            quantity: '2 Pills',
            startDate: new Date(2024, 3, 14, 8, 0), // April 14, 2024, 08:00 AM
            startSlot: 'Morning',
            endDate: new Date(2024, 3, 21, 20, 0), // April 21, 2024, 08:00 PM
            endSlot: 'Evening',
        },
    ];

    const handleLogout = () => {

        setIsLoggedIn(false);
        Snackbar.show({
            text: 'Logout Successful',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#62a8c3',
            marginBottom: screenHeight - 44
        });

    }

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                // Assuming 'client' is your axios instance
                const data = {
                    caregiverid: profile._id,
                }
                const response = await client.post('/caregivers/get-patients', data);
                console.log('data : ', response.data.patients[0]);
                console.log('reminder list : ', response.data.reminders)
                setPatients(response.data.patients);
                setReminders(response.data.reminders);

            } catch (err) {
                console.error(err);
                // Snackbar.show({
                //     text: 'Failed to load patients',
                //     duration: Snackbar.LENGTH_SHORT
                // });
            }
        };

        fetchPatients();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView stickyHeaderIndices={[0]}>
                <View style={styles.stickyHeader}>
                    {profile && (

                        <TouchableOpacity>
                            <View style={styles.userContainer}>
                                <View style={styles.detailsAndProgress}>
                                    <Text style={styles.detailsText}>Welcome {profile.name}!</Text>
                                    {/* <Progress.Bar
                                        style={styles.progress}
                                        progress={10 / 50} // Assuming 1000 is the max points
                                        width={200}
                                        color="red"
                                        unfilledColor="rgba(255, 255, 255, 0.5)"
                                        borderColor="rgba(255, 255, 255, 0)"
                                    /> */}
                                    <Text style={styles.pointsText}>How is your day going?</Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                {patients && reminders && patients.map((patient, index) => {
                    // Get the corresponding reminders for this patient
                    const patientReminders = reminders[index] || [];
                    console.log('reminder list after saving : ', reminders)
                    // console.log('reminders : ', index);
                    return (
                        <FlatCardsVertical
                            key={index} // Assuming each patient has a unique _id
                            caregiverInfo={profile}
                            patientInfo={patient}
                            medicineInfo={patientReminders}
                        />
                    );
                })}
            </ScrollView>
            <FAB
                placement="right"
                color='#62a8c3'
                size="large"
                title="Logout"
                icon={{ name: 'logout', color: '#FFFFFF' }}
                onPress={handleLogout}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f8', // Or any other color matching your theme
    },
    stickyHeader: {
        backgroundColor: '#6A1B9A', // Or any other color matching your theme
        marginBottom: 8
    },
    userContainer: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#6A1B9A', // Or any other color matching your theme
    },
    badgeImage: {
        width: 50,
        height: 60,
        marginRight: 16, // Space between the badge image and the details
    },
    detailsAndProgress: {
        flex: 1,
        justifyContent: 'space-evenly', // Evenly distribute space around items
        alignItems: 'center'
    },
    detailsText: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 4,
    },
    pointsText: {
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 4,
    },
    progress: {
        marginTop: 4,
    },
    modalView: {
        margin: 20,
        backgroundColor: "#f4f1f4",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#38006b'
    },
    badgeContainer: {
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        alignItems: 'center',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 3,
    },
    highlightedBadge: {
        borderColor: '#FFD700',
        borderWidth: 2,
    },
    badgeTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#38006b',
    },
    badgeImageModal: {
        width: 60,
        height: 70,
        margin: 8,
    },
    pointsRange: {
        fontSize: 16,
        color: '#555',
    },
    description: {
        textAlign: 'center',
        color: '#666',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#6A1B9A', // Or any other color matching your theme
        padding: 10,
        borderRadius: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
    },
    scrollViewStyle: {
        height: '76%', // Or a fixed value like 300
        alignSelf: 'center', // This will center the ScrollView
    },
});

