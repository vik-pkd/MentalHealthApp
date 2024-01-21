import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const PatientSearchEntry = (props: any) => {
    const handlePress = (e: any) => {
        console.log('Touched', props);
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={handlePress}>
                <Text style={{ backgroundColor: 'blue', textAlign: 'left', flex: 1 }}>
                    {props.name}
                </Text>
            </ Pressable>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        flexDirection: 'row',
        borderWidth: 2,
        margin: 2
    }
});

export default PatientSearchEntry;