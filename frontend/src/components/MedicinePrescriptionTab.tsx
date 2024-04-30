import { StyleSheet, Text, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";

import MedicinePrescriptionDisplay from "./doctor/MedicinePrescriptionDisplay";
import { PrescriptionTabsParamList } from "../routes/PrescriptionTabs";


const MedicinePrescriptionTab = () => {
    const gameRoute = useRoute<RouteProp<PrescriptionTabsParamList>>();
    const patientId = gameRoute.params!.patientId;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MedicinePrescriptionDisplay patientId={patientId}/>
        </View>
    );
};

export default MedicinePrescriptionTab;

const styles = StyleSheet.create({

});