import { StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-date-picker";

import globalStyles from "../constants/styles";

const CustomDatePicker = ({
    mode,
    label,
    date,
    onDateChange
}: {
    mode: "date" | "time" | "datetime";
    label?: string;
    date: Date;
    onDateChange: (date: Date) => void;
}) => {
    return (
        <View>
        <Text style={[globalStyles.blackText]}>{label}</Text>
        <DatePicker
            style={[styles.datePicker]}
            date={date}
            mode={mode}
            confirmText='Confirm'
            cancelText='Cancel'
            onDateChange={(date) => onDateChange(date)}
            minimumDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
        />
    </View>
    );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
    datePicker: {
        
    },
});