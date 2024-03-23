import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import {
    Button,
    Dialog,
} from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GameStackParamList } from '../../../routes/PatientStack';
import { useLogin } from '../../../context/LoginProvider';
// import { Balloons } from 'react-native-fiesta';

type GameScreenProps = NativeStackScreenProps<GameStackParamList, 'TicTacToe'>;

const TicTacToe = ({ navigation, route }: GameScreenProps) => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [pointEarned, setpointEarned] = useState(false);
    const { updateUserPoints, setExtraPoints } = useLogin();
    const { extraPoints } = route.params ?? { extraPoints: 0 };

    const handleMessage = (event: any) => {
        const data = JSON.parse(event.nativeEvent.data);
        console.log(data);
        if (data.type) {
            const totalPoints = data.points + extraPoints;
            setExtraPoints(extraPoints);
            setDialogVisible(true);
            setpointEarned(totalPoints);
            updateUserPoints(totalPoints, 'Strategy');
        }
    };

    const navigateBack = () => {
        // Close the dialog and navigate back
        setDialogVisible(false);
        const state = navigation.getState();

        // Find out if the current screen is at the root of its stack navigator
        let isAtRootOfStack = false;
        if (state.routes.length > 1) {
            isAtRootOfStack = false; // More than one route in the stack implies it's not at the root
        } else {
            isAtRootOfStack = true; // Only one route in the stack implies it's at the root
        }

        if (isAtRootOfStack || !navigation.canGoBack()) {
            // If at the root or cannot go back further, navigate to Home
            navigation.navigate('Home');
        } else {
            // Otherwise, go back in the current stack
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                source={{ uri: 'file:///android_asset/games/tic_tac_toe/index.html' }}
                onMessage={handleMessage}
            />
            <Dialog
                isVisible={dialogVisible}
                onBackdropPress={() => setDialogVisible(false)}
            >
                <Dialog.Title titleStyle={styles.dialogueTitle} title="Game Over" />
                <Text style={styles.dialogueText}>You earned {pointEarned} Mental Points!!!</Text>
                <Button title="Proceed" onPress={navigateBack} color={'rgba(134, 65, 244, 1)'} />
            </Dialog>

            {/* <View style={styles.container}>
                <Balloons />
            </View> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    dialogueTitle: {
        color: 'black',
        marginBottom: 0
    },
    dialogueText: {
        color: 'black',
        marginBottom: 16
    },
    container: {
        flex: 1,
    },
});

export default TicTacToe;
