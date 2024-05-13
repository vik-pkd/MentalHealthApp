import { ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Activity {
    step: string;
    game: string;
    video: string;
    reading: string;
    points: number;
}

const activities: Activity[] = [
    {
        step: "Glimmers of Hope",
        game: "Hangman (focus on word association and calm thinking)",
        video: "Meditation (a guided visualization to explore inner thoughts)",
        reading: "Blog on identifying and understanding depression symptoms",
        points: 100
    },
    {
        step: "Breaking Dawn",
        game: "Flappy Bird (focus on maintaining rhythm and patience)",
        video: "Yoga (gentle yoga for stress relief)",
        reading: "Blog on strategies for coping with anxiety in silence",
        points: 150
    },
    {
        step: "Rays of Renewal",
        game: "Maze Game (solving mazes to symbolize finding a way out of dark thoughts)",
        video: "Exercise (light exercises to improve mood and energy levels)",
        reading: "Blog on the benefits of psychotherapy",
        points: 200
    }
];

const Chapter2: React.FC = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [unlockedSteps, setUnlockedSteps] = useState<number[]>([]);

    useEffect(() => {
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
        AsyncStorage.clear();
        loadProgress();
    }, []);

    const handlePress = async (index: number) => {
        if (unlockedSteps.includes(index)) {
            setSelectedActivity(activities[index]);
            setModalVisible(true);
        } else if (index === unlockedSteps.length) { // Assuming sequential unlocking
            const newUnlockedSteps = [...unlockedSteps, index];
            setUnlockedSteps(newUnlockedSteps);
            await AsyncStorage.setItem('chapter1Progress', JSON.stringify(newUnlockedSteps));
            setSelectedActivity(activities[index]);
            setModalVisible(true);
        }
    };


    return (
        <LinearGradient
            colors={['#483D8B', '#6A5ACD', '#7B68EE']} // Adjust colors to match your design
            style={styles.backgroundGradient}
        >
            <ImageBackground source={require('../../../../assets/common/chapter2.jpg')} style={styles.backgroundImage}>
                {/* Navigation Paths */}
                <View style={styles.pathContainer}>
                    <TouchableOpacity
                        style={[styles.pathItem1, !unlockedSteps.includes(0) && styles.locked]}
                        onPress={() => handlePress(0)}
                    >
                        {unlockedSteps.includes(0) ? (
                            <Ionicons name="lock-open" size={16} color="#fff" style={styles.lockIcon} />
                        ) : (
                            <Ionicons name="lock-closed" size={16} color="#fff" style={styles.lockIcon} />
                        )}
                        <Text style={styles.pathText1}>{activities[0].step}</Text>

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
                        <Text style={styles.pathText2}>{activities[1].step}</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.pathItem3, !unlockedSteps.includes(2) && styles.locked]}
                        onPress={() => handlePress(2)}
                    >
                        {unlockedSteps.includes(2) ? (
                            <Ionicons name="lock-open" size={8} color="#fff" style={styles.lockIcon} />
                        ) : (
                            <Ionicons name="lock-closed" size={8} color="#fff" style={styles.lockIcon} />
                        )}
                        <Text style={styles.pathText3}>{activities[2].step}</Text>

                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>{selectedActivity?.step}</Text>
                    <Text>Game: {selectedActivity?.game}</Text>
                    <Text>Video: {selectedActivity?.video}</Text>
                    <Text>Reading: {selectedActivity?.reading}</Text>
                    <Text>Points: {selectedActivity?.points}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
        width: '100%'
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
        paddingHorizontal: 8,
        borderRadius: 50,
        marginVertical: 10,
        position: 'absolute',
        left: 20,
        top: 503,
        transform: [{ rotate: '20deg' }],
        // Add shadow or other styles as needed
    },
    pathItem2: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(206,147,216, 0.8)', // Semi-transparent red background
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 50,
        marginVertical: 10,
        position: 'absolute',
        left: 145,
        top: 485,
        transform: [{ rotate: '23deg' }],
        // Add shadow or other styles as needed
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
        left: 250,
        top: 475,
        transform: [{ rotate: '23deg' }],
        // Add shadow or other styles as needed
    },

    pathText1: {
        color: '#fff',
        fontSize: 14,
        // Additional text styling if needed
    },
    pathText2: {
        color: '#fff',
        fontSize: 10,
        // Additional text styling if needed
    },
    pathText3: {
        color: '#fff',
        fontSize: 6,
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
    },


    // Modal Styling
    modalView: {
        margin: 20,
        backgroundColor: '#38006b',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#9c4dcc',
        padding: 10,
        borderRadius: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
})

export default Chapter2;