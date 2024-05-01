import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Assuming you have this installed
import { useLogin } from '../../../context/LoginProvider';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GameStackParamList } from '../../../routes/PatientStack';
import * as Progress from 'react-native-progress';
import client from '../../../api/client';
import { useSelector } from 'react-redux';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from '@rneui/base';
import Chapter1 from './Chapter1';
import Chapter2 from './Chapter2';


type GameScreenProps = NativeStackScreenProps<GameStackParamList, 'TicTacToe'>

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
    {
        id: 'chapter1',
        title: 'Chapter 1',
        component: Chapter1, // Import and use actual component
    },
    {
        id: 'chapter2',
        title: 'Chapter 2',
        component: Chapter2, // Make sure to create and import this component
    },
    // Add more chapters as needed
];

const Journey: React.FC = () => {

    const navigation = useNavigation<GameScreenProps>();
    const isFocused = useIsFocused();
    const { extraPoints, profile } = useLogin();
    const authToken = useSelector((state: Record<string, { token: string | null }>) => state.authToken.token);

    const [modalVisible, setModalVisible] = useState(false);
    const [introModalVisible, setIntroModalVisible] = useState(false);
    const [instModalVisible, setInstModalVisible] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);

    const [currentChapter, setCurrentChapter] = useState(chapters[0]); // Default to the first chapter

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

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

        const fetchActivities = async () => {

            const resp = await client.get(`/patients/activities`, { headers });
            if (resp.data.status === 'success') {
                // console.log(resp.data);
                console.log('Activities : ', resp.data.activities);
                setCurrentActivity(resp.data.activities[0]);  // Assume setAlerts updates state correctly
            } else if (resp.data.alerts.length === 0) {
                console.log("No Activities to show.");
            } else {
                console.log("Failed to fetch Activties:", resp.data);
            }
        };


        const checkIntroModal = async () => {
            if (isFocused) {
                const statusIntroModal = await getData('pop_status'); // Await the async function
                if (statusIntroModal === null) {
                    openIntroModal();
                    AsyncStorage.setItem('pop_status', '1');
                } else {
                    setInstModalVisible(true);
                }
            } else {
                closeModal();
            }
        };

        checkIntroModal();

        if (!isFocused) {
            closeModal();
        }

        // fetchActivities();
    }, [isFocused]);

    return (
        <View style={styles.container}>

            {/* Chapter selection buttons */}
            <View style={styles.chapterSelector}>
                {chapters.map((chapter) => (
                    <TouchableOpacity key={chapter.id} style={styles.button} onPress={() => setCurrentChapter(chapter)}>
                        <Text style={styles.buttonText}>{chapter.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Render the selected chapter's component */}
            <View style={styles.chapterContainer}>
                <currentChapter.component />
            </View>

            {/* Introduction Model */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={introModalVisible}
                onRequestClose={closeIntroModal}>
                <TouchableOpacity
                    style={styles.container}
                    activeOpacity={1}
                    onPressOut={() => { setIntroModalVisible(false); }}
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

            {/* Instruction Model */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={instModalVisible}
                onRequestClose={() => {
                    setInstModalVisible(!instModalVisible);
                }}>

                <View style={styles.centeredView}>
                    <View style={styles.introModalView}>
                        <Text>Dear Seeker,</Text>
                        <Text></Text>
                        <Text style={styles.letterText}>You will encounter various quests at each step, you need to complete them to progress in your journey to free yourself.</Text>
                        <Text></Text>
                        <Text style={styles.letterText}>Also, if you complete multiple steps you will progress through many chapters.</Text>
                        <Text></Text>
                        <Text style={styles.letterText}>Are you ready ?</Text>
                        <Text></Text>
                        {/* <Text>Warm regards,</Text>
                        <Text>A Guide of the Sanctuary</Text> */}
                        <TouchableOpacity style={styles.buttonProceed} onPress={() => { setInstModalVisible(!instModalVisible); }}>
                            <Text style={styles.textStyle}>Proceed</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.userContainer}>
                            <Image source={require('../../../../assets/mindfullness/game.jpg')} style={styles.badgeImage} />
                            <View style={styles.detailsAndProgress}>
                                <Text style={styles.TitleText}>Tic Tac Toe</Text>
                                <Progress.Bar
                                    style={styles.progress}
                                    progress={extraPoints} // Assuming 1000 is the max points
                                    width={200}
                                    color={'#9c4dcc'}
                                    unfilledColor="rgba(255, 255, 255, 0.5)"
                                    borderColor="black"
                                />
                                <Text style={styles.pointsText}>Points Collected : {extraPoints} / 5</Text>
                                <Text style={styles.detailsText}>Stimulate your brain with fun strategy games.</Text>
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate('Games', { screen: 'TicTacToe', params: { extraPoints: 5 } })}>
                                <Text style={styles.textStyle}>Start</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonClose} onPress={closeModal}>
                                <Text style={styles.textStyle}>Close</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View >


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    checkboxContainer: {
        flexDirection: 'row',
    },
    chapterSelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4e9ec5',
        padding: 10,
    },
    buttonText: {
        color: '#fff',
    },
    chapterContainer: {
        flex: 1,
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
        backgroundColor: '#f4f1f4',
        borderRadius: 20,
        padding: 20,
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
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 8
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
    letterText: {
        color: 'white',
        fontWeight: 'normal'
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 4,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
});

export default Journey;