import { Pressable, StyleSheet, Text, View } from "react-native";

const ContentPrescriptionTab = () => {
    return (
        <View style={styles.container}>
            <Text style={{ color: '#38006b', alignSelf: 'center', marginTop: 8 }}>Content Assigned</Text>
            <Pressable
                style={styles.addModalButton}
            >
                <Text style={styles.buttonText}>Add Content</Text>
            </Pressable>
        </View>
    );
};

export default ContentPrescriptionTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
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