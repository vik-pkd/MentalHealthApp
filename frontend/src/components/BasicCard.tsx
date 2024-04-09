import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import FlatCards from './FlatCards'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GameStackParamList } from '../routes/PatientStack';
import { Dimensions } from "react-native";
import * as Progress from 'react-native-progress';
import { useLogin } from '../context/LoginProvider';

type GameScreenProps = NativeStackScreenProps<GameStackParamList, 'TicTacToe'>

interface Activity {
    source: ReturnType<typeof require>;
    title: string;
    description: string;
    navigation: keyof GameStackParamList;
    img: ReturnType<typeof require>;
}

const screenWidth = Dimensions.get("window").width;

export default function BasicCard() {
    const navigation = useNavigation<GameScreenProps>();
    const isFocused = useIsFocused();
    const { extraPoints } = useLogin();
    const images: Activity[] = [
        { source: require('../../assets/mindfullness/yoga.jpg'), title: 'Yoga', description: 'Relax and find balance with yoga.', navigation: 'TicTacToe', img: require('../../assets/mindfullness/yoga.jpg') },
        { source: require('../../assets/mindfullness/game.jpg'), title: 'Tic Tac Toe', description: 'Stimulate your brain with fun strategy games.', navigation: 'TicTacToe', img: require('../../assets/games/tic-tac-toe.png') },
        { source: require('../../assets/mindfullness/medicine.jpg'), title: 'Medication Reminder', description: 'Keep up with your medication.', navigation: 'Casual', img: require('../../assets/mindfullness/yoga.jpg') },
    ];

    const [modalVisible, setModalVisible] = useState(false);
    const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);

    const openModal = (activity: any) => {
        setCurrentActivity(activity);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    React.useEffect(() => {
        if (!isFocused) {
            closeModal();
        }
    }, [isFocused]);

    return (
        <View>
            <View style={[styles.card, styles.cardElevated]}>
                <View style={styles.cardImageContainer}>
                    {images.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => openModal(item)}>
                            <Image source={item.source} style={styles.cardImage} />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>Recommended Activities</Text>
                    <Text style={styles.cardDescription}>These are the activities recommended by your doctor, you can earn extra points and rewards by doing this!</Text>
                    <Text style={styles.cardFooter}>Updated 12 mins ago</Text>
                </View>
            </View>
            {/* Modal View */}
            {currentActivity && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.userContainer}>
                                <Image source={currentActivity.img} style={styles.badgeImage} />
                                <View style={styles.detailsAndProgress}>
                                    <Text style={styles.TitleText}>{currentActivity.title}</Text>
                                    <Progress.Bar
                                        style={styles.progress}
                                        progress={extraPoints} // Assuming 1000 is the max points
                                        width={200}
                                        color={'#9c4dcc'}
                                        unfilledColor="rgba(255, 255, 255, 0.5)"
                                        borderColor="black"
                                    />
                                    <Text style={styles.pointsText}>Points Collected : {extraPoints} / 5 </Text>
                                    <Text style={styles.detailsText}>{currentActivity.description}</Text>
                                </View>
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate('Quest Hub', { screen: 'TicTacToe', params: { extraPoints: 5 } })}>
                                    <Text style={styles.textStyle}>Start</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonClose} onPress={closeModal}>
                                    <Text style={styles.textStyle}>Close</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>
            )
            }
        </View >
    )
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    card: {
        width: screenWidth - 16,
        height: 250,
        borderRadius: 6,
        marginVertical: 8,
        marginHorizontal: 8
    },
    cardElevated: {
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowOffset: {
            width: 1,
            height: 1
        }
    },
    cardImageContainer: {
        flexDirection: 'row', // Arrange images in a row
        justifyContent: 'space-evenly', // Evenly space the images
        alignItems: 'center', // Align images centrally
        height: 120, // Set the height for the image container
        marginTop: 8
    },
    cardImage: {
        width: (screenWidth - 16) / 3 - 10, // Divide width equally among three images, minus some margin
        height: '100%', // Use full height of the container
        resizeMode: 'contain', // Ensure the images fit without stretching
        borderRadius: 6, // Optional: if you want rounded corners for images
    },
    cardBody: {
        flex: 1,
        flexGrow: 1,
        paddingHorizontal: 12
    },
    cardTitle: {
        color: '#000000',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
        marginTop: 2
    },
    cardLabel: {
        color: '#000000',
        fontSize: 14,
        marginBottom: 4
    },
    cardDescription: {
        color: '#57606f',
        fontSize: 13,

        marginTop: 6
    },
    cardFooter: {
        color: '#6a1b9a'
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
})