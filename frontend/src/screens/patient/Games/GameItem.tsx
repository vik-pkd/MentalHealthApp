import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import {
    Button,
    Dialog,
} from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { useLogin } from '../../../context/LoginProvider';
import { GameStackParamList } from '../../../routes/PatientStack';
import { RootState } from '../../../store/rootReducer';
import { useFont } from '@shopify/react-native-skia';
import { Examples } from './Examples';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type GameScreenProps = NativeStackScreenProps<GameStackParamList, 'GameItem'>;

const GameItem = ({ route, navigation }: GameScreenProps) => {
    const games = useSelector((state: RootState) => state.games.games);
    const gameId = route.params._id;
    const gameCategory = route.params.category;
    const requiredGame = games.filter(game => game._id === gameId)[0];

    const [dialogVisible, setDialogVisible] = useState(false);
    const [animationVisible, setAnimationVisible] = useState(false);
    const [pointEarned, setpointEarned] = useState(false);
    const { updateUserPoints, setExtraPoints } = useLogin();
    const extraPoints = route.params ?? { extraPoints: 0 };

    const animationRef = useRef<LottieView>(null);

    const handleMessage = (event: any) => {
        const data = JSON.parse(event.nativeEvent.data);
        console.log(data);
        if (data.type) {
            const totalPoints = data.points + extraPoints;
            setExtraPoints(extraPoints);
            setpointEarned(totalPoints);
            updateUserPoints(totalPoints, gameCategory);
            setAnimationVisible(true); // Show animation first
            setTimeout(() => {
                setAnimationVisible(false);
                setDialogVisible(true); // Show dialog after animation
            }, 5000); // Adjust timeout to match the length of your animation
        }
    };

    const navigateBack = () => {
        // Close the dialog and navigate back
        setDialogVisible(false);
        navigation.goBack(); // Or use the specific navigation action you need
    };

    useEffect(() => {
        if (animationVisible && animationRef.current) {
            animationRef.current.play();
        }
    }, [animationVisible]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <Canvas style={styles.canvas}>
                <Circle r={128} cx={128} cy={128} color="red" />
            </Canvas> */}

            <WebView
                source={{ html: requiredGame.htmlContent }}
                onMessage={handleMessage}
            />
            <Dialog

                isVisible={dialogVisible}
                onBackdropPress={() => setDialogVisible(false)}
            >

                <Dialog.Title titleStyle={styles.dialogueTitle} title="Game Finished!" />
                <Text style={styles.dialogueText}>Yayyyyy!</Text>


                <View style={styles.footer3}>
                    <Text style={styles.pointsText}>You earned {pointEarned} Mental Points!!!</Text>
                    <Icon name="flash" size={20} color="#FFD700" style={styles.icon} />
                </View>
                <Text></Text>
                <Button title="Proceed" onPress={navigateBack} color={'#9c4dcc'} />

            </Dialog>

            {/* <View style={styles.container}>
                <Balloons />
            </View> */}
            {animationVisible && (
                <LottieView
                    ref={animationRef}
                    source={require("../../../../assets/animations/fireworks3.json")}
                    style={{ flexGrow: 1, width: "100%", height: "100%", position: 'absolute', zIndex: 10 }}
                    loop={false}
                    autoPlay
                    onAnimationFinish={() => {
                        setAnimationVisible(false);
                        setDialogVisible(true); // Show dialog when animation finishes
                    }}
                    resizeMode='cover'
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    canvas: {
        flex: 1,
    },
    dialogueTitle: {
        color: '#38006b',
        marginBottom: 8,
        fontSize: 20
    },
    dialogueText: {
        color: 'black',
        fontWeight: 'normal',
        fontSize: 14
    },
    container: {

        flex: 1,
    },
    footer3: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginTop: 8,
    },
    pointsText: {
        fontSize: 16,
        color: '#000',
        marginTop: 8,
    },
});

export default GameItem;
