import { View, Text, TextInput, StyleSheet } from "react-native";

import globalStyles from "../constants/styles";

const LabelTextInput = ({
    label,
    value,
    placeholder,
    onChangeText
}: {
    label: string,
    value: string,
    placeholder: string,
    onChangeText: (text: string) => void,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                onChangeText={(text) => onChangeText(text)}
            />
        </View>
    );
};

export default LabelTextInput;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        position: 'relative',
        backgroundColor: 'white'
    },
    label: {
        position: 'absolute',
        top: -8,
        left: 10,
        backgroundColor: 'white',
        color: 'black',
        paddingHorizontal: 5,
        zIndex: 1,
    },
    input: {
        borderWidth: 0,
        padding: 0,
        margin: 0,
        color: 'black'
    },
});