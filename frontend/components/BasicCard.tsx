import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import FlatCards from './FlatCards'

export default function BasicCard() {
    return (
        <View>
            <View style={[styles.card, styles.cardElevated]}>
                <View style={styles.cardImage}>
                    <FlatCards />
                </View>

                <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>Popular Activities</Text>
                    {/* <Text style={styles.cardLabel}>Pink City, Jaipur</Text> */}
                    <Text style={styles.cardDescription}>These are what most active users are doing right now!</Text>
                    <Text style={styles.cardFooter}>Updated 12 mins ago</Text>
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
    card: {
        width: 360,
        height: 230,
        borderRadius: 6,
        marginVertical: 12,
        marginHorizontal: 16
    },
    cardElevated: {
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowOffset: {
            width: 1,
            height: 1
        }
    },
    cardImage: {
        height: 120,
        marginBottom: 4,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },
    cardBody: {
        flex: 1,
        flexGrow: 1,
        paddingHorizontal: 12
    },
    cardTitle: {
        color: '#000000',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
        marginTop: 2
    },
    cardLabel: {
        color: '#000000',
        fontSize: 14,
        marginBottom: 4
    },
    cardDescription: {
        color: '#57606f',
        fontSize: 13,
        marginBottom: 14,
        marginTop: 6
    },
    cardFooter: {
        color: 'rgba(134, 65, 244, 1)'
    }
})