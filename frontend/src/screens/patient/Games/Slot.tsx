import React, { useState } from 'react';
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

type GameScreenProps = NativeStackScreenProps<GameStackParamList, 'Slot'>;

const Slot = ({ navigation }: GameScreenProps) => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [pointEarned, setpointEarned] = useState(false);
    const { updateUserPoints } = useLogin();

    const handleMessage = (event: any) => {
        const data = JSON.parse(event.nativeEvent.data);
        console.log(data);
        if (data.type) {
            setDialogVisible(true);
            setpointEarned(data.points);
            updateUserPoints(data.points, 'Puzzle');
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
                source={{ uri: 'file:///android_asset/games/slot/index.html' }}
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

export default Slot;
