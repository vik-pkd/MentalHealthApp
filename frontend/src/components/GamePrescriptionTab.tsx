import { StyleSheet, Text, View } from "react-native";

const GamePrescriptionTab = () => {
    return (
        <View style={styles.container}>
            <Text style={{ color: 'blue' }}>Game</Text>
        </View>
    );
};

export default GamePrescriptionTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});