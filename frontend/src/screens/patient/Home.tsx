import { StyleSheet, Text, View, ScrollView, Image, Animated, Modal, TouchableOpacity, FlatList } from 'react-native'
import FancyCard from '../../components/FancyCard'
import BasicCard from '../../components/BasicCard'
import HistoryCard from '../../components/HistoryCards'
import { FAB } from '@rneui/themed'
import Snackbar from 'react-native-snackbar'
import React, { useContext, useState, useEffect, useRef } from 'react'
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';

//context API
import { useLogin } from '../../context/LoginProvider';
import MedicinePrescriptionDisplay from '../../components/doctor/MedicinePrescriptionDisplay';
import PrescriptionCalendarModal from '../../components/patient/PrescriptionCalendarModal'
import MedicineReminderDisplay from '../../components/patient/MedicineReminderDisplay'

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

    const isCurrentRank = (badge: Badge): boolean => userPoints >= badge.minPoints && userPoints <= badge.maxPoints;

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


    return (
        <View style={styles.container}>
            <ScrollView stickyHeaderIndices={[0]}>
                <View style={styles.stickyHeader}>
                    {profile && (

                        <TouchableOpacity onPress={toggleModal}>
                            <View style={styles.userContainer}>
                                <Animated.View style={[styles.userContainer, { transform: [{ translateY: moveAnim }] }]}>
                                    <Image source={require('../../../assets/badges/1.png')} style={styles.badgeImage} />
                                    {/* ... */}
                                </Animated.View>
                                <View style={styles.detailsAndProgress}>
                                    <Text style={styles.detailsText}>Welcome {profile.name}!</Text>
                                    <Progress.Bar
                                        style={styles.progress}
                                        progress={userPoints / 100} // Assuming 1000 is the max points
                                        width={200}
                                        color="red"
                                        unfilledColor="rgba(255, 255, 255, 0.5)"
                                        borderColor="rgba(255, 255, 255, 0)"
                                    />

                                    <Text style={styles.pointsText}>Points: {userPoints} / 100 </Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <FancyCard />
                <BasicCard />
                {/* <HistoryCard /> */}
                {/* <MedicinePrescriptionDisplay patientId={profile._id}/> */}
                <MedicineReminderDisplay patientId={profile._id}/>
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
