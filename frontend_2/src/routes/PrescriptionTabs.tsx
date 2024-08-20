import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";
import MedicinePrescriptionTab from "../components/MedicinePrescriptionTab";
import GamePrescriptionTab from "../components/GamePrescriptionTab";
import ContentPrescriptionTab from "../components/ContentPrescriptionTab";
import { NavigationContainer } from "@react-navigation/native";


export type PrescriptionTabsParamList = {
    Medicine: { patientId: string };
    Games: undefined;
    Content: undefined;
};

const Tab = createMaterialTopTabNavigator<PrescriptionTabsParamList>();

const PrescriptionTabs = ({ patientId }: { patientId: string }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Medicine" component={MedicinePrescriptionTab} initialParams={{ patientId: patientId }} />
            <Tab.Screen name="Games" component={GamePrescriptionTab} initialParams={{ patientId: patientId }} />
            <Tab.Screen name="Content" component={ContentPrescriptionTab} />
        </Tab.Navigator>
    );
};

export default PrescriptionTabs;

const styles = StyleSheet.create({

});