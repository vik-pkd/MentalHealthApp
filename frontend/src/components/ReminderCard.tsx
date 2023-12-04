import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React from 'react';
import FlatCards from './FlatCards';

export default function ReminderCard(props) {
    return (
        <View>
            <View style={styles.container}>
                <View style={[styles.card]}>
                    <Text style={styles.cardText}>{props.medicine}</Text>
                    <Text style={styles.cardText}>{props.date}</Text>
                    <Text style={styles.cardText}>{props.slot}</Text>
                    <Text style={styles.cardText}>{props.isBeforeFood?"Yes":"No"}</Text>
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
});