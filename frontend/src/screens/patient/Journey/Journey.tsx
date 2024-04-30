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

const Journey: React.FC = () => {

    const navigation = useNavigation<GameScreenProps>();
    const isFocused = useIsFocused();
    const { extraPoints, profile } = useLogin();
    const authToken = useSelector((state: Record<string, { token: string | null }>) => state.authToken.token);
    // const images: Activity[] = [
    //     { source: require('../../../assets/mindfullness/yoga.jpg'), title: 'Yoga', description: 'Relax and find balance with yoga.', navigation: 'TicTacToe', img: require('../../../assets/mindfullness/yoga.jpg') },
    //     { source: require('../../../assets/mindfullness/game.jpg'), title: 'Tic Tac Toe', description: 'Stimulate your brain with fun strategy games.', navigation: 'TicTacToe', img: require('../../../assets/games/tic-tac-toe.png') },
    //     { source: require('../../../assets/mindfullness/medicine.jpg'), title: 'Medication Reminder', description: 'Keep up with your medication.', navigation: 'Casual', img: require('../../../assets/mindfullness/yoga.jpg') },
    // ];

    const [modalVisible, setModalVisible] = useState(false);
    const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
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

        if (!isFocused) {
            closeModal();
        }
        fetchActivities();
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#483D8B', '#6A5ACD', '#7B68EE']} // Adjust colors to match your design
                style={styles.backgroundGradient}
            >
                <ImageBackground source={require('../../../../assets/common/forest.jpg')} style={styles.backgroundImage}>
                    {/* Navigation Paths */}
                    <View style={styles.pathContainer}>
                        {/* Example path item */}
                        <TouchableOpacity style={styles.pathItem} onPress={() => openModal()}>
                            <Text style={styles.pathText}>The Shadows Within</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pathItem2}>
                            <Text style={styles.pathText2}>The Hidden Light</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pathItem3}>
                            <Text style={styles.pathText3}>Mastering Oneself</Text>
                        </TouchableOpacity>
                        {/* You can add more path items here */}
                    </View>
                </ImageBackground>
            </LinearGradient>

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
                                <Text style={styles.TitleText}>{currentActivity.gameName}</Text>
                                <Progress.Bar
                                    style={styles.progress}
                                    progress={extraPoints} // Assuming 1000 is the max points
                                    width={200}
                                    color={'#9c4dcc'}
                                    unfilledColor="rgba(255, 255, 255, 0.5)"
                                    borderColor="black"
                                />
                                <Text style={styles.pointsText}>Points Collected : {extraPoints} / {currentActivity.points}</Text>
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
        </View>


    );
};

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
    pathItem: {
        backgroundColor: 'rgba(206,147,216, 0.8)', // Semi-transparent red background
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 50,
        marginVertical: 10,
        position: 'absolute',
        left: 70,
        top: 600,
        // Add shadow or other styles as needed
    },
    pathItem2: {
        backgroundColor: 'rgba(206,147,216, 0.8)', // Semi-transparent red background
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 50,
        marginVertical: 10,
        position: 'absolute',
        left: 115,
        top: 540,
        // Add shadow or other styles as needed
    },
    pathItem3: {
        backgroundColor: 'rgba(106,27,154, 0.8)', // Semi-transparent red background
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 50,
        marginVertical: 10,
        position: 'absolute',
        left: 130,
        top: 480,
        // Add shadow or other styles as needed
    },

    pathText: {
        color: '#fff',
        fontSize: 18,
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
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 4,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
});

export default Journey;