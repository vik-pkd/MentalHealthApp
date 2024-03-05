import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import BasicButton from '../BasicButton';
import CustomDatePicker from '../CustomDatePicker';
import { usePrescription } from './PrescriptionProvider';
import { useSelector } from 'react-redux';
import client from '../../api/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AddPrescriptionStackParamList } from '.';

const milliSecondsInDay = 86400000;

type TimeScreenProps = NativeStackScreenProps<AddPrescriptionStackParamList, 'TimeInfo'>;

const TimeInfo = ({route}: TimeScreenProps) => {
    const { numberOfDoses, setDoseTimings, name, doseTimings, startDate, endDate, quantity, foodTiming, image } = usePrescription();
    const authToken = useSelector((state: Record<string, { token: string}>) => state.authToken.token);


    useEffect(() => {
        console.log('route.params.patientId', route.params.patientId);
        const newTimings = new Array<Date>(numberOfDoses).fill(new Date());
        setDoseTimings(newTimings);
    }, [numberOfDoses]);

    const handleDateChange = (item: Date, index: number) => {
        const newTimings = doseTimings.map(date => date);
        newTimings[index] = item;
        setDoseTimings(newTimings);
    };

    const handleSubmit = async() => {
        const prescriptionData = new FormData();

        prescriptionData.append('details',JSON.stringify({
            name: name,
            startDate: startDate,
            endDate: endDate,
            quantity: quantity,
            frequency: numberOfDoses,
            foodTiming: foodTiming,
            doseTimings: doseTimings
        }));
        prescriptionData.append('image', image);
        console.log(prescriptionData);
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`
        };
        const response = await client.post(`/doctors/add-prescription/patient/${route.params.patientId}`, prescriptionData, { headers });
        console.log(response.data);
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                {doseTimings.map((item, index) => {
                    return (
                    <CustomDatePicker
                        key={index}
                        mode='time'
                        label={'Dose ' + (index + 1).toString() + ' timing'}
                        date={item}
                        onDateChange={(date) => handleDateChange(date, index)}
                    />
                )})}
                <BasicButton
                    title="Submit"
                    onPress={handleSubmit}
                />
            </ScrollView>
        </View>
    );
};

export default TimeInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey'
    },
    counting: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: 'white'
    },
});