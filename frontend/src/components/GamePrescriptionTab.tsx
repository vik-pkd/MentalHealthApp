import { Pressable, StyleSheet, Text, View } from "react-native";
import AssignGameModal from "./AssignGameModal";
import { PrescriptionTabsParamList } from "../routes/PrescriptionTabs";
import { PatientSerachStackParamList } from "../routes/AppStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useState } from "react";
import GamePrescriptionDisplay from "./doctor/GamePrescriptionDisplay";

type PatientProfileParamsList = NativeStackScreenProps<PatientSerachStackParamList, 'PatientProfile'>;

const GamePrescriptionTab = ({ navigation }: PatientProfileParamsList) => {
    const [isGameModalVisible, setIsGameModalVisible] = useState(false);

    const gameRoute = useRoute<RouteProp<PrescriptionTabsParamList>>();
    const patientId = gameRoute.params!.patientId;

    return (


        <View style={styles.container}>
            <Text style={{ color: '#38006b', alignSelf: 'center', marginTop: 8 }}>Games Assigned</Text>
            <GamePrescriptionDisplay patientId={patientId} />
            <Pressable
                onPress={() => setIsGameModalVisible(true)}
                style={styles.addModalButton}
            >
                <Text style={styles.buttonText}>Add Game</Text>
            </Pressable>
            <AssignGameModal isVisible={isGameModalVisible} onRequestClose={() => setIsGameModalVisible(false)} patientId={patientId} />
        </View>

    );
};

export default GamePrescriptionTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addModalButton: {
        marginBottom: 8,
        marginHorizontal: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#6a1b9a', // Purple background color for the button
        elevation: 2,
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: 'white', // White text color for the button
        fontWeight: 'bold',
        alignSelf: 'center'
    },
});