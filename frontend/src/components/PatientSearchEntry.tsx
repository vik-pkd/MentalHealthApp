import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const PatientSearchEntry = (props: any) => {
    const handlePress = (e: any) => {
        console.log('Touched', props);
    };

    return (
        <Pressable onPress={handlePress}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {props.name}
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
        color: 'black',
    }
});

export default PatientSearchEntry;