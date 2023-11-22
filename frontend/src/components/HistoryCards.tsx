import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import FlatCards from './FlatCards'
import FlatCardsVertical from './FlatCardsVertical'

export default function HistoryCard() {
    return (
        <View>

            <View style={[styles.card, styles.cardElevated]}>
                <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>Past Activities</Text>
                    <Text style={styles.cardDescription}>Looks like you don't have anything in your history just yet. Want to start with mini-meditation?</Text>
                    <ScrollView style={styles.scroll}>
                        <FlatCardsVertical />
                        <FlatCardsVertical />
                        <FlatCardsVertical />
                        <FlatCardsVertical />
                    </ScrollView>
                    {/* <Text style={styles.cardFooter}>Updated 12 mins ago</Text> */}
                </View>

                {/* <FlatCardsVertical /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 360,
        height: 500,
        borderRadius: 6,
        marginVertical: 12,
        marginHorizontal: 16,
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
        marginTop: 4
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
        marginTop: 4
    },
    cardFooter: {
        color: 'rgba(134, 65, 244, 1)'
    },
    scroll: {
        flex: 1,
        flexDirection: 'column'
    }
})