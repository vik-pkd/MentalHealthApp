import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FlatCards() {
    return (
        <View>
            <View style={styles.container}>
                <View style={[styles.card, styles.cardOne]}>
                    <Text style={styles.cardText}>Meditate</Text>
                </View>
                <View style={[styles.card, styles.cardTwo]}>
                    <Text style={styles.cardText}>Focus</Text>
                </View>
                <View style={[styles.card, styles.cardThree]}>
                    <Text style={styles.cardText}>Move</Text>
                </View>
            </View>
        </View>
    )
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
        justifyContent: 'center'
    },
    cardText: {
        color: '#ffffff'
    },
    cardOne: {
        backgroundColor: 'rgba(134, 65, 244, 1)'
    },
    cardTwo: {
        backgroundColor: 'rgba(134, 65, 244, 1)'
    },
    cardThree: {
        backgroundColor: 'rgba(134, 65, 244, 1)'
    }

})