import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';

export default function ReminderCard(props) {
    return (
        <View>
            <View style={styles.container}>
                <View style={[styles.card]}>
                    <Text style={styles.cardText}>Medicine: {props.medicine}</Text>
                    <Text style={styles.cardText}>Date: {props.date}</Text>
                    <Text style={styles.cardText}>Slot: {props.slot}</Text>
                    <Text style={styles.cardText}>Before/After food: {props.isBeforeFood?"Before":"After"}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 8
    },
    card: {
        flex: 1,
        width: 100,
        height: 100,
        borderRadius: 4,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(134, 65, 244, 1)'
    },
    cardText: {
        color: '#ffffff',
    },
    medicineTakenButton: {
        backgroundColor: 'white'
    }
});