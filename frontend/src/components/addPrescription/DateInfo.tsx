import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native"
import DatePicker from "react-native-date-picker"

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AddPrescriptionStackParamList } from ".";
import BasicButton from "../BasicButton";
import globalStyles from "../../constants/styles";
import CustomDatePicker from "../CustomDatePicker";
import { usePrescription } from "./PrescriptionProvider";
import { setMidNight } from "../../utils/date";

type StartEndDateScreenProps = NativeStackScreenProps<AddPrescriptionStackParamList, 'DateInfo'>;

const StartEndDate = ({ navigation, route }: StartEndDateScreenProps) => {
    const { startDate, setStartDate, endDate, setEndDate } = usePrescription();
    const params = route.params;

    const handleChangeStartDate = (date: Date) => {
        const dateObj = setMidNight(date);
        console.log('Start Date', dateObj);
        setStartDate(dateObj);
    };

    const handleChangeEndDate = (date: Date) => {
        const dateObj = setMidNight(date);
        console.log('End Date', dateObj);
        setEndDate(dateObj);
    };

    const handleNext = () => {
        navigation.navigate('TimeInfo');
    };

    return (
        <View style={styles.datePicker}>
            <CustomDatePicker
                mode="date"
                label="Start Date"
                date={startDate}
                onDateChange={handleChangeStartDate}
            />
            <CustomDatePicker
                mode="date"
                label="End Date"
                date={endDate}
                onDateChange={handleChangeEndDate}
            />
            <BasicButton
                title="Next"
                onPress={handleNext}
            />
        </View>
    );
};

export default StartEndDate;

const styles = StyleSheet.create({
    datePicker: {
        // backgroundColor: 'grey',
    },
});