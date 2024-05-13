import { Pressable, StyleSheet, Text, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";

import MedicinePrescriptionDisplay from "./doctor/MedicinePrescriptionDisplay";
import { PrescriptionTabsParamList } from "../routes/PrescriptionTabs";
import { PatientSerachStackParamList } from "../routes/AppStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type PatientProfileParamsList = NativeStackScreenProps<PatientSerachStackParamList, 'PatientProfile'>;

const MedicinePrescriptionTab = ({ navigation }: PatientProfileParamsList) => {
    const gameRoute = useRoute<RouteProp<PrescriptionTabsParamList>>();
    const patientId = gameRoute.params!.patientId;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MedicinePrescriptionDisplay patientId={patientId} />
            <Pressable
                onPress={() => navigation.navigate('Prescription', { _id: patientId })}
                style={styles.addModalButton}
            >
                <Text style={styles.buttonText}>Add Medicine</Text>
            </Pressable>

        </View>
    );
};

export default MedicinePrescriptionTab;

const styles = StyleSheet.create({
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