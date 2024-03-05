import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import StartEndDate from "./DateInfo";
import TimeInfo from "./TimeInfo";
import MedicineInfo from "./MedicineInfo";
import PrescriptionProvider, { usePrescription } from "./PrescriptionProvider";
import { PatientSerachStackParamList } from '../../routes/AppStack';

export type AddPrescriptionStackParamList = {
    MedInfo: undefined;
    DateInfo: undefined;
    TimeInfo: { patientId: string };
}

const Stack = createNativeStackNavigator<AddPrescriptionStackParamList>();

type AddPrescriptionScreenProps = NativeStackScreenProps<PatientSerachStackParamList, 'Prescription'>;

const AddPrescription = ({route}: AddPrescriptionScreenProps) => {
    const {name, numberOfDoses} = usePrescription();
    console.log('from index name', name, numberOfDoses);
    const params = route.params;
    useEffect(() => {
      console.log('params', params);
      console.log('params._id', params._id);
    }, [])
    
    return (
        <PrescriptionProvider>
            <View style={styles.container}>
                <Stack.Navigator>
                    <Stack.Screen name='MedInfo' component={MedicineInfo}/>
                    <Stack.Screen name='DateInfo' component={StartEndDate} />
                    <Stack.Screen name='TimeInfo' component={TimeInfo} initialParams={{patientId: params._id}}/>
                </Stack.Navigator>
            </View>
        </PrescriptionProvider>
    );
};

export default AddPrescription;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});