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

type StartEndDateScreenProps = NativeStackScreenProps<AddPrescriptionStackParamList, 'DateInfo'>;

const StartEndDate = ({ navigation, route }: StartEndDateScreenProps) => {
    const { startDate, setStartDate, endDate, setEndDate } = usePrescription();
    const params = route.params;

    const handleNext = () => {
        navigation.navigate('TimeInfo');
    };

    return (
        <View>
            <CustomDatePicker
                mode="date"
                label="Start Date"
                date={startDate}
                onDateChange={(date) => setStartDate(date)}
            />
            <CustomDatePicker
                mode="date"
                label="End Date"
                date={endDate}
                onDateChange={(date) => setEndDate(date)}
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
        backgroundColor: 'grey',
    },
});