import React, { useState } from 'react';
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
// import { Balloons } from 'react-native-fiesta';

type GameScreenProps = NativeStackScreenProps<GameStackParamList, 'GameItem'>;

const GameItem = ({route, navigation }: GameScreenProps) => {
    const games = useSelector((state: RootState) => state.games.games);
    const gameId = route.params._id;
    const requiredGame = games.filter(game => game._id === gameId)[0];

    const [dialogVisible, setDialogVisible] = useState(false);
    const [pointEarned, setpointEarned] = useState(false);
    const { updateUserPoints } = useLogin();

    const handleMessage = (event: any) => {
        const data = JSON.parse(event.nativeEvent.data);
        console.log(data);
        if (data.type) {
            setDialogVisible(true);
            setpointEarned(data.points);
            updateUserPoints(data.points, 'Strategy');
        }
    };

    const navigateBack = () => {
        // Close the dialog and navigate back
        setDialogVisible(false);
        navigation.goBack(); // Or use the specific navigation action you need
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                source={{ html: requiredGame.htmlContent }}
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

export default GameItem;
