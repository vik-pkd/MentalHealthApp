import { Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
import ActivityModal from '../../../components/patient/ActivityModal';
import { useSelector } from 'react-redux';
import { useLogin } from '../../../context/LoginProvider';
import client from '../../../api/client';
import { useNavigation } from '@react-navigation/native';

interface Activity {
    type: string;
    title: string;
    pointsCollected: number;
    maxPoints: number;
    image: any;  // Adjust this as necessary to match the type used for images
    isDoctorRecommended: boolean;
}


interface Step {
    id: string,
    title: string,
    activities: Activity[]
}

interface Game {
    title: string;
    description: string;
    category: string;
}

const init_steps: Step[] = [
    {
        id: 'step1',
        title: 'Unveiling the Mist',
        activities: [
            {
                type: 'Game',
                title: 'Tic Tac Toe',
                pointsCollected: 0,
                maxPoints: 5,
                image: require('../../../../assets/mindfullness/game.jpg'),
                isDoctorRecommended: true
            },
            {
                type: 'Meditation',
                title: 'Focus',
                pointsCollected: 0,
                maxPoints: 5,
                image: require('../../../../assets/mindfullness/meditation.png'),
                isDoctorRecommended: false,
            },
            {
                type: 'Yoga',
                title: 'Traditional Yoga',
                pointsCollected: 0,
                maxPoints: 5,
                image: require('../../../../assets/mindfullness/medicine.jpg'),
                isDoctorRecommended: false,
            }
        ],
    },
    {
        id: 'step2',
        title: 'Echoes of Silence',
        activities: [
            {
                type: 'Game',
                title: 'Crossy Road',
                pointsCollected: 20,
                maxPoints: 50,
                image: require('../../../../assets/mindfullness/game.jpg'),
                isDoctorRecommended: false,
            },
            {
                type: 'Video',
                title: 'Meditation',
                pointsCollected: 30,
                maxPoints: 50,
                image: require('../../../../assets/mindfullness/meditation.png'),
                isDoctorRecommended: false,
            },
            {
                type: 'Reading',
                title: 'Depression Symptoms',
                pointsCollected: 0,
                maxPoints: 1,
                image: require('../../../../assets/mindfullness/medicine.jpg'),
                isDoctorRecommended: false,
            }
        ],
    },
    {
        id: 'step3',
        title: 'Depths of Darkness',
        activities: [
            {
                type: 'Game',
                title: 'Tic Tac Toe',
                pointsCollected: 20,
                maxPoints: 50,
                image: require('../../../../assets/mindfullness/game.jpg'),
                isDoctorRecommended: false,
            },
            {
                type: 'Video',
                title: 'Meditation',
                pointsCollected: 30,
                maxPoints: 50,
                image: require('../../../../assets/mindfullness/game.jpg'),
                isDoctorRecommended: false,
            }
        ],
    }
];

const Chapter1: React.FC = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedStep, setSelectedStep] = useState<Step>(init_steps[0]);
    const [steps, setSteps] = useState<Step[]>(init_steps);
    const [unlockedSteps, setUnlockedSteps] = useState<number[]>([]);
    const authToken = useSelector((state: Record<string, { token: string | null }>) => state.authToken.token);
    const { profile } = useLogin();
    const navigation = useNavigation();

    const loadProgress = async () => {
        const progress = await AsyncStorage.getItem('chapter1Progress');
        if (progress) {
            setUnlockedSteps(JSON.parse(progress));
        } else {
            // Initially unlock the first step only
            setUnlockedSteps([0]);
            await AsyncStorage.setItem('chapter1Progress', JSON.stringify([0]));
        }
    };

    const fetchGames = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${authToken}`
            };

            const resp = await client.get(`/patients/games/patient/${profile._id}`, { headers });
            if (resp.data.status === 'success') {
                console.log('Games fetched successfully : ', resp.data.games)
                updateActivities(resp.data.games);
            }

        } catch (error) {
            console.error('Fetch games error:', error);
        }
    };

    const updateActivities = (games: Game[]) => {
        const newSteps = steps.map(step => ({
            ...step,
            activities: step.activities.map(activity => ({
                ...activity,
                isDoctorRecommended: games.some(game => game.title === activity.title)
            }))
        }));
        setSteps(newSteps);
    };


    useEffect(() => {
        AsyncStorage.clear();
        loadProgress();
        fetchGames();
    }, []);

    const handlePress = async (index: number) => {
        if (unlockedSteps.includes(index)) {
            setSelectedStep(steps[index]);
            setModalVisible(true);
        } else if (index === unlockedSteps.length) { // Assuming sequential unlocking
            const allActivitiesCompleted = steps[index - 1].activities.every(activity => activity.pointsCollected >= activity.maxPoints);
            if (allActivitiesCompleted) {
                const newUnlockedSteps = [...unlockedSteps, index];
                setUnlockedSteps(newUnlockedSteps);
                await AsyncStorage.setItem('chapter1Progress', JSON.stringify(newUnlockedSteps));
                setSelectedStep(steps[index]);
                setModalVisible(true);
            }
        }
    };

    return (
        <LinearGradient
            colors={['#483D8B', '#6A5ACD', '#7B68EE']} // Adjust colors to match your design
            style={styles.backgroundGradient}
        >
            <ImageBackground source={require('../../../../assets/common/forest.jpg')} style={styles.backgroundImage}>
                {/* Navigation Paths */}
                <View style={styles.pathContainer}>
                    <TouchableOpacity
                        style={[styles.pathItem1, !unlockedSteps.includes(0) && styles.locked]}
                        onPress={() => handlePress(0)}
                    >
                        {unlockedSteps.includes(0) ? (
                            <Ionicons name="lock-open" size={18} color="#fff" style={styles.lockIcon} />
                        ) : (
                            <Ionicons name="lock-closed" size={18} color="#fff" style={styles.lockIcon} />
                        )}
                        <Text style={styles.pathText1}>{steps[0].title}</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.pathItem2, !unlockedSteps.includes(1) && styles.locked]}
                        onPress={() => handlePress(1)}
                    >
                        {unlockedSteps.includes(1) ? (
                            <Ionicons name="lock-open" size={14} color="#fff" style={styles.lockIcon} />
                        ) : (
                            <Ionicons name="lock-closed" size={14} color="#fff" style={styles.lockIcon} />
                        )}
                        <Text style={styles.pathText2}>{steps[1].title}</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.pathItem3, !unlockedSteps.includes(2) && styles.locked]}
                        onPress={() => handlePress(2)}
                    >
                        {unlockedSteps.includes(2) ? (
                            <Ionicons name="lock-open" size={10} color="#fff" style={styles.lockIcon} />
                        ) : (
                            <Ionicons name="lock-closed" size={10} color="#fff" style={styles.lockIcon} />
                        )}
                        <Text style={styles.pathText3}>{steps[2].title}</Text>

                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <ActivityModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                activities={selectedStep.activities}
                navigation={navigation}
            />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundGradient: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    pathContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // Additional styles if needed for positioning
    },
    pathItem1: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(206,147,216, 0.8)', // Semi-transparent red background
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginVertical: 12,
        position: 'absolute',
        left: 81.5,
        top: 605,
    },
    pathItem2: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(206,147,216, 0.8)', // Semi-transparent red background
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginVertical: 10,
        position: 'absolute',
        left: 110,
        top: 542,
    },
    pathItem3: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(206,147,216, 0.8)', // Semi-transparent red background
        paddingVertical: 8,
        paddingHorizontal: 6,
        borderRadius: 50,
        marginVertical: 10,
        position: 'absolute',
        left: 132,
        top: 480,
    },

    pathText1: {
        color: '#fff',
        fontSize: 16,
        // Additional text styling if needed
    },
    pathText2: {
        color: '#fff',
        fontSize: 12,
        // Additional text styling if needed
    },
    pathText3: {
        color: '#fff',
        fontSize: 8,
        // Additional text styling if needed
    },


    // Lock Styling
    locked: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(80,80,80,0.8)', // Darker background for locked steps
        // paddingHorizontal: 8,
    },
    lockIcon: {
        // marginLeft: 10,
        marginRight: 2
    }
})


export default Chapter1;