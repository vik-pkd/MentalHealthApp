import { StyleSheet, Text, View, ScrollView, Image, Animated, Modal, TouchableOpacity, FlatList, Platform, Alert } from 'react-native'
import FancyCard from '../../components/FancyCard'
import BasicCard from '../../components/BasicCard'
import HistoryCard from '../../components/HistoryCards'
import { Button, FAB } from '@rneui/themed'
import Snackbar from 'react-native-snackbar'
import React, { useContext, useState, useEffect, useRef } from 'react'
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from "react-redux";
import client from "../../api/client";

//context API
import { useLogin } from '../../context/LoginProvider';
import MedicinePrescriptionDisplay from '../../components/doctor/MedicinePrescriptionDisplay';
import MedicineReminderDisplay from '../../components/patient/MedicineReminderDisplay'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PushNotification from 'react-native-push-notification'
import CharacterCard from '../../components/patient/CharacterCard'

type UserObj = {
    name: String;
    email: String;
    id: String;
}

interface Badge {
    id: number;
    title: string;
    minPoints: number;
    maxPoints: number;
    description: string;
    path: any;
}

interface BadgeProps {
    badge: Badge;
    isCurrent: boolean;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleString('en-US', {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    return formattedTime;
};



// Define your badges and points somewhere in your component or data file
const badges: Badge[] = [
    { id: 1, title: 'Bronze I', minPoints: 0, maxPoints: 100, description: 'Every journey starts with a single step. Yours begins now!', path: require('../../../assets/badges/1.png') },
    { id: 2, title: 'Bronze II', minPoints: 101, maxPoints: 200, description: 'Great work taking those first steps! Lets keep the momentum going!', path: require('../../../assets/badges/2.png') },
    { id: 3, title: 'Bronze III', minPoints: 201, maxPoints: 300, description: 'You are showing real commitment. Your journey is well underway!', path: require('../../../assets/badges/3.png') },
    { id: 4, title: 'Bronze IV', minPoints: 301, maxPoints: 400, description: 'Consistency is key, and you are mastering it. Fantastic job!', path: require('../../../assets/badges/4.png') },
    { id: 5, title: 'Silver I', minPoints: 401, maxPoints: 500, description: 'You have reached a new height! Silver is the color of your resilience.', path: require('../../../assets/badges/5.png') },
    { id: 6, title: 'Silver II', minPoints: 501, maxPoints: 600, description: 'Look at you shine! Keep up the self-care and press on.', path: require('../../../assets/badges/6.png') },
    { id: 7, title: 'Silver III', minPoints: 601, maxPoints: 700, description: 'You are making progress. Stay on track!', path: require('../../../assets/badges/7.png') },
    { id: 8, title: 'Silver IV', minPoints: 701, maxPoints: 800, description: 'You are making progress. Stay on track!', path: require('../../../assets/badges/8.png') },
    { id: 9, title: 'Gold I', minPoints: 801, maxPoints: 900, description: 'You are making progress. Stay on track!', path: require('../../../assets/badges/9.png') },
    { id: 10, title: 'Gold II', minPoints: 901, maxPoints: 1000, description: 'You are making progress. Stay on track!', path: require('../../../assets/badges/10.png') },
    { id: 11, title: 'Gold III', minPoints: 1001, maxPoints: 2000, description: 'You are breaking barriers and setting new benchmarks. Amazing work!', path: require('../../../assets/badges/11.png') },
    { id: 12, title: 'Gold III', minPoints: 2001, maxPoints: 3000, description: 'Platinum status! Your dedication to well-being is truly exemplary!', path: require('../../../assets/badges/12.png') },
];

const BadgeContainer: React.FC<BadgeProps> = ({ badge, isCurrent }) => (
    <LinearGradient
        colors={isCurrent ? ['#6A1B9A', '#ce93d8'] : ['#FFFFFF', '#EEEEEE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.badgeContainer, isCurrent && styles.highlightedBadge]}
    >
        <Text style={styles.badgeTitle}>{badge.title}</Text>
        <Image source={badge.path} style={styles.badgeImageModal} />
        <Text style={styles.pointsRange}>{badge.minPoints} - {badge.maxPoints} Points</Text>
        <Text style={styles.description}>{badge.description}</Text>
    </LinearGradient>
);

export default function Home() {
    const { setIsLoggedIn, profile, userCategory, userPoints } = useLogin();
    const moveAnim = useRef(new Animated.Value(0)).current;
    const [isModalVisible, setModalVisible] = useState(false);
    const [isPresModalVisible, setPresModalVisible] = useState(false);
    const authToken = useSelector((state: Record<string, { token: string | null }>) => state.authToken.token);

    const isCurrentRank = (badge: Badge): boolean => userPoints >= badge.minPoints && userPoints <= badge.maxPoints;
    const [numReminders, setNumReminders] = useState(0);
    const [alerts, setAlerts] = useState([]);

    const handleLogout = () => {

        setIsLoggedIn(false);
        Snackbar.show({
            text: 'Logout Successful',
            duration: Snackbar.LENGTH_SHORT
        });

    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const togglePresModal = () => {
        setPresModalVisible(!isPresModalVisible);
    };

    // Define the animation sequence
    useEffect(() => {
        const startAnimation = () => {
            Animated.sequence([
                Animated.timing(moveAnim, {
                    toValue: -10,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(moveAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start((e) => {
                if (e.finished) {
                    startAnimation(); // Only restart if animation wasn't interrupted by unmounting
                }
            });
        };

        startAnimation();
        // Cleanup function to stop animation if component unmounts
        return () => moveAnim.stopAnimation();
    }, [moveAnim]);

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${authToken}`
        };
        const fetchPrescriptions = async () => {
            const resp = await client.get(`/patients/reminders`, { headers });
            if (resp.data.status === 'success') {
                setNumReminders(resp.data.reminders.length);
            }
        };

        const fetchAlerts = async () => {
            const resp = await client.get(`/patients/alerts`, { headers });
            if (resp.data.status === 'success' && resp.data.alerts.length > 0) {
                console.log('Alerts : ', resp.data.alerts);
                setAlerts(resp.data.alerts);  // Assume setAlerts updates state correctly

                // Function to recursively show alerts one by one
                const showAlertsSequentially = (index = 0) => {
                    if (index < resp.data.alerts.length) {
                        const alert = resp.data.alerts[index];
                        const formattedTime = formatDate(alert.time); // Make sure formatDate is defined to format date strings

                        Alert.alert(
                            'Medication Reminder', // Title of the alert
                            `It's time to take your medicine:\n\nMedicine: ${alert.medicine}\nDose: ${alert.quantity}\nCaregiver: ${alert.caregiver}\nTime: ${formattedTime}`, // Message showing details
                            [
                                {
                                    text: 'Remind Me Later',
                                    onPress: () => console.log('Reminder Delayed'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'Taken',
                                    onPress: () => {
                                        console.log('Medicine Taken');
                                        showAlertsSequentially(index + 1); // Show next alert after this one is dismissed
                                    }
                                },
                            ],
                            { cancelable: false } // This ensures the alert must be interacted with
                        );
                    }
                };

                showAlertsSequentially(); // Start showing alerts from the first one
            } else if (resp.data.alerts.length === 0) {
                console.log("No alerts to show.");
            } else {
                console.log("Failed to fetch alerts:", resp.data);
            }
        };
        fetchPrescriptions();
        fetchAlerts();
    }, [profile._id]);



    return (
        <View style={styles.container}>
            <ScrollView stickyHeaderIndices={[0]}>
                <View style={styles.stickyHeader}>
                    {profile && (


                        <View style={styles.userContainer}>


                            <TouchableOpacity onPress={toggleModal}>
                                <Animated.View style={[styles.userContainer, { transform: [{ translateY: moveAnim }] }]}>
                                    <Image source={require('../../../assets/badges/1.png')} style={styles.badgeImage} />
                                    {/* ... */}
                                </Animated.View>
                            </TouchableOpacity>


                            <View style={styles.detailsAndProgress}>
                                <Text style={styles.detailsText}>Welcome {profile.name}!</Text>
                                <Progress.Bar
                                    style={styles.progress}
                                    progress={userPoints / 100} // Assuming 1000 is the max points
                                    width={185}
                                    color="red"
                                    unfilledColor="rgba(255, 255, 255, 0.5)"
                                    borderColor="rgba(255, 255, 255, 0)"
                                />

                                <Text style={styles.pointsText}>Points: {userPoints} / 100 </Text>

                            </View>

                            <TouchableOpacity onPress={togglePresModal}>
                                <View style={styles.notificationContainer}>
                                    <Ionicons name="notifications-circle-outline" color="#f4f1f4" size={60} />
                                    {numReminders > 0 && (
                                        <View style={styles.notificationDot} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <FancyCard />

                <View style={styles.characterContainer}>
                    <CharacterCard />
                </View>

                {/* <BasicCard /> */}
                {/* <HistoryCard /> */}
                <MedicineReminderDisplay patientId={profile._id} />
            </ScrollView>

            <FAB
                placement="right"
                color='#6A1B9A'
                size="large"
                title="Logout"
                icon={{ name: 'logout', color: '#FFFFFF' }}
                onPress={handleLogout}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Badges and Points</Text>
                    <ScrollView style={styles.scrollViewStyle}>
                        {badges.map((badge) => (
                            <BadgeContainer key={badge.id} badge={badge} isCurrent={isCurrentRank(badge)} />
                        ))}
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isPresModalVisible}
                onRequestClose={togglePresModal}
            >
                <View style={styles.modalViewPres}>
                    <Text style={styles.modalTitle}>Prescriptions</Text>
                    <MedicineReminderDisplay patientId={profile._id} />
                    <TouchableOpacity style={styles.closeButtonPres} onPress={togglePresModal}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
    modalViewPres: {
        margin: 20,
        backgroundColor: "#f4f1f4",
        borderRadius: 20,
        padding: 20,
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
    closeButtonPres: {
        marginTop: 5,
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
    notificationContainer: {
        // Container to position the dot relative to the icon
        position: 'relative',
        marginRight: 4
    },
    notificationDot: {
        // Red dot style
        position: 'absolute',
        right: 0, // Position as needed
        top: 0, // Position as needed
        width: 10, // Size as needed
        height: 10, // Size as needed
        borderRadius: 5, // Half the size of the width to make it round
        backgroundColor: 'red',
    },
    characterContainer: {
        margin: 8
    }
});
