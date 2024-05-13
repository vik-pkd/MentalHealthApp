import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const PatientSearchEntry: React.FC<{ _id: string; name: string; email: string; onPress: (_id: string) => void }> = ({ _id, name, email, onPress }) => {
    return (
        <Pressable onPress={() => onPress(_id)}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {name}
                </Text>
            </View>
        </ Pressable>
    )
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        // flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 6,
        paddingVertical: 4,
        marginHorizontal: 8,
        marginVertical: 3
    },
    text: {
        color: '#f4f1f4',
    }
});

export default PatientSearchEntry;