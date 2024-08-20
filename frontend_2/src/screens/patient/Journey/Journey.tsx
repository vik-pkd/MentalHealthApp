import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useLogin } from '../../../context/LoginProvider';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import client from '../../../api/client';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Chapter1 from './Chapter1';
import Chapter2 from './Chapter2';
import Chapter3 from './Chapter3';
import Chapter4 from './Chapter4';

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


// type GameScreenProps = NativeStackScreenProps<GameStackParamList, 'TicTacToe'>

// interface Activity {
//     source: ReturnType<typeof require>;
//     title: string;
//     description: string;
//     navigation: keyof GameStackParamList;
//     img: ReturnType<typeof require>;
// }

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleString('en-US', {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    return formattedTime;
};

interface Activity {
    gameName: string;
    title: string;
    points: number;
    startDate: Date;
    endDate: Date;
}

const getData = async (key: string) => {
    // get Data from Storage
    try {
        const data = await AsyncStorage.getItem(key);
        if (data !== null) {
            // console.log(data);
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};

// const images: Activity[] = [
//     { source: require('../../../assets/mindfullness/yoga.jpg'), title: 'Yoga', description: 'Relax and find balance with yoga.', navigation: 'TicTacToe', img: require('../../../assets/mindfullness/yoga.jpg') },
//     { source: require('../../../assets/mindfullness/game.jpg'), title: 'Tic Tac Toe', description: 'Stimulate your brain with fun strategy games.', navigation: 'TicTacToe', img: require('../../../assets/games/tic-tac-toe.png') },
//     { source: require('../../../assets/mindfullness/medicine.jpg'), title: 'Medication Reminder', description: 'Keep up with your medication.', navigation: 'Casual', img: require('../../../assets/mindfullness/yoga.jpg') },
// ];

// Chapters data - this could be expanded with more properties as needed
const chapters = [
    { id: 'chapter1', title: '1. The Shadows Within', component: Chapter1, objective: 'Explore the inner shadows of your mind, confront your hidden fears, and start the journey towards understanding your own mental landscape. You will encounter various quests at each step, you need to complete them to progress in your journey to free yourself.' },
    { id: 'chapter2', title: '2. The Hidden Light', component: Chapter2, objective: 'Discover the hidden light within yourself. Learn to find positivity and hope even in the darkest times. Also, if you complete multiple steps you will progress through many chapters.' },
    { id: 'chapter3', title: '3. Mastering Oneself', component: Chapter3, objective: 'Master your emotions and thoughts to gain control over your mental state. Develop self-discipline and resilience to face any challenge. Are you ready?' },
    { id: 'chapter4', title: '4. Emerging Enlightened', component: Chapter4, objective: 'Emerge enlightened from your journey with a deeper understanding and wisdom about yourself and your mental health. Use the insights gained to foster a lasting state of peace and fulfillment.' },
];


const Journey: React.FC = () => {

    // const navigation = useNavigation<GameScreenProps>();
    const isFocused = useIsFocused();
    const { extraPoints, profile } = useLogin();
    const authToken = useSelector((state: Record<string, { token: string | null }>) => state.authToken.token);

    // const [modalVisible, setModalVisible] = useState(false);
    const [introModalVisible, setIntroModalVisible] = useState(false);
    const [isSelected, setSelection] = useState(false);
    // const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);

    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [unlockedChapters, setUnlockedChapters] = useState([0, 1]); // Initially, only the first chapter is unlocked
    const [chapterModalVisible, setChapterModalVisible] = useState(false); // Show modal on first entry
    const currentChapter = chapters[currentChapterIndex];

    const opacity = useSharedValue(1);

    const goToNextChapter = async () => {
        if (currentChapterIndex < chapters.length - 1 && unlockedChapters.includes(currentChapterIndex + 1)) {
            opacity.value = 0;
            setTimeout(() => {
                setCurrentChapterIndex(currentChapterIndex + 1);
                opacity.value = 1;
                setChapterModalVisible(true);
                AsyncStorage.setItem('currentChapterIndex', (currentChapterIndex + 1).toString());
            }, 300);
        } else if (currentChapterIndex < chapters.length - 1 && !unlockedChapters.includes(currentChapterIndex + 1)) {
            setUnlockedChapters([...unlockedChapters, currentChapterIndex + 1]); // Unlock next chapter
            goToNextChapter(); // Automatically navigate to next chapter
        }
    };

    const goToPreviousChapter = () => {
        if (currentChapterIndex > 0) {
            opacity.value = 0;
            setTimeout(() => {
                setCurrentChapterIndex(currentChapterIndex - 1);
                opacity.value = 1;
                setChapterModalVisible(true);
            }, 300);
        }
    };

    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacity.value, { duration: 300 }),
        };
    });

    // const openModal = () => {
    //     setModalVisible(true);
    // };

    // const closeModal = () => {
    //     setModalVisible(false);
    // };

    const openIntroModal = () => {
        setIntroModalVisible(true);
    };

    const closeIntroModal = () => {
        setIntroModalVisible(false);
    };

    React.useEffect(() => {

        const headers = {
            'Authorization': `Bearer ${authToken}`
        };

        // const fetchActivities = async () => {

        //     const resp = await client.get(`/patients/activities`, { headers });
        //     if (resp.data.status === 'success') {
        //         // console.log(resp.data);
        //         console.log('Activities : ', resp.data.activities);
        //         setCurrentActivity(resp.data.activities[0]);  // Assume setAlerts updates state correctly
        //     } else if (resp.data.alerts.length === 0) {
        //         console.log("No Activities to show.");
        //     } else {
        //         console.log("Failed to fetch Activties:", resp.data);
        //     }
        // };


        const checkIntroModal = async () => {
            if (isFocused) {
                const statusIntroModal = await getData('pop_status'); // Await the async function
                if (statusIntroModal === null) {
                    openIntroModal();
                    AsyncStorage.setItem('pop_status', '1');
                } else {
                    setChapterModalVisible(true);
                }
            }
        };

        const loadProgression = async () => {
            const storedIndex = await AsyncStorage.getItem('currentChapterIndex');
            if (storedIndex) {
                setCurrentChapterIndex(parseInt(storedIndex));
                setUnlockedChapters(Array.from({ length: parseInt(storedIndex) + 1 }, (_, i) => i));
            }
        };


        AsyncStorage.clear();
        loadProgression();
        checkIntroModal();

    }, [isFocused]);

    return (
        <View style={styles.container}>

            {/* Chapter selection buttons */}
            <View style={styles.chapterSelector}>
                {currentChapterIndex > 0 && (
                    <TouchableOpacity style={styles.button} onPress={goToPreviousChapter}>
                        <Ionicons name="caret-back-outline" size={25} color="#fff" />
                    </TouchableOpacity>
                )}
                {currentChapterIndex < chapters.length - 1 && unlockedChapters.includes(currentChapterIndex + 1) ? (
                    <TouchableOpacity style={styles.button} onPress={goToNextChapter}>
                        <Ionicons name="caret-forward-outline" size={25} color="#fff" />
                    </TouchableOpacity>
                ) : (
                    <View style={[styles.button, styles.locked]}>
                        <Ionicons name="lock-closed-outline" size={25} color="#fff" />
                    </View>
                )}
            </View>

            {/* Render the selected chapter's component */}
            <Animated.View style={[styles.chapterContainer, animatedStyles]}>
                <currentChapter.component />
            </Animated.View>

            {/* Introduction Model */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={introModalVisible}
                onRequestClose={closeIntroModal}>
                <TouchableOpacity
                    style={styles.container}
                    activeOpacity={1}
                    onPressOut={() => { setIntroModalVisible(false); setChapterModalVisible(true); }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.introModalView}>
                            <Text>Dear Seeker,</Text>
                            <Text></Text>
                            <Text style={styles.letterText}>Welcome to the Sanctuary of Self, where your journey of self-discovery begins. This place, born from the struggles we all face, offers a path to peace and understanding.</Text>
                            <Text></Text>
                            <Text style={styles.letterText}>As you wander its paths, you'll encounter various aspects of yourself, aiding in your healing. Let the Sanctuary's whispers guide you, as they echo your inner voice, steering you towards inner balance.</Text>
                            <Text></Text>
                            <Text>Warm regards,</Text>
                            <Text>A Guide of the Sanctuary</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

            <Modal
                visible={chapterModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setChapterModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.titleText}>{chapters[currentChapterIndex].title}</Text>
                        <Text></Text>
                        <Text style={styles.chapterText}>{chapters[currentChapterIndex].objective}</Text>
                        <Text></Text>
                        <Text style={styles.chapterText}>Also, if you complete multiple quests you will progress through chapters.</Text>
                        <Text></Text>
                        <Text style={styles.chapterText}>Are you ready ?</Text>
                        <Text></Text>


                        <TouchableOpacity
                            style={styles.buttonClose}
                            onPress={() => setChapterModalVisible(false)}
                        >
                            <Text style={styles.textStyle}>Begin</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    checkboxContainer: {
        flexDirection: 'row',
    },
    chapterSelector: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        top: 20,
        left: 0,
        zIndex: 2,
        // height: '100%',
        width: '100%',
    },
    button: {
        backgroundColor: '#9c4dcc',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 50,
    },
    buttonText: {
        color: '#fff',
    },
    chapterContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        zIndex: 1,
        height: '100%',
        width: '100%'
    },

    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: '#fff',
        // Additional styles for your tab bar
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for the overlay
    },
    modalView: {
        margin: 20,
        backgroundColor: '#38006b',
        borderRadius: 20,
        padding: 28,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    introModalView: {
        margin: 20,
        backgroundColor: '#38006b',
        borderRadius: 20,
        padding: 30,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    userContainer: {
        flexDirection: 'row',
        padding: 4,
        alignItems: 'center',
    },
    badgeImage: {
        width: 60,
        height: 100,
        marginRight: 8, // Space between the badge image and the details
    },
    detailsAndProgress: {
        flex: 1,
    },
    TitleText: {
        fontSize: 18,
        color: 'black',
        marginBottom: 4,
    },
    detailsText: {
        fontSize: 14,
        color: 'grey',
        marginBottom: 4,
        alignSelf: 'flex-start'
    },
    pointsText: {
        fontSize: 16,
        color: 'black',
        marginTop: 4,
    },
    progress: {
        marginTop: 4,
    },
    buttonClose: {
        backgroundColor: '#6a1b9a',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        // marginHorizontal: 8,
        alignSelf: 'stretch'
    },
    buttonStart: {
        backgroundColor: '#38006b',
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonProceed: {
        backgroundColor: '#9c4dcc',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        alignSelf: 'stretch'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    letterText: {
        color: 'white',
        fontWeight: 'normal'
    },
    chapterText: {
        color: 'white',
        fontWeight: 'normal',
        // textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 4,
        alignItems: 'center',
    },
    locked: {
        backgroundColor: '#666', // Darken button to indicate locked
    },
});

export default Journey;