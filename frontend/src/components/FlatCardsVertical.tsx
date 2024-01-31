import {
    StyleSheet, Text, View,
    Button,
    SafeAreaView,
    Alert
} from 'react-native'
import React from 'react'

export default function FlatCardsVertical() {
    return (
        <View>
            <View style={styles.container}>

                <View style={[styles.card, styles.cardOne]}>
                    <Text style={styles.cardText}>Meditate</Text>
                </View>

                <View style={[styles.card2]}>
                    <Text style={styles.card2Text}>Breath</Text>

                    <Text style={styles.card2BodyText}>Perform this for 1-2 mins.</Text>

                    <View style
                        ={styles.buttonContainer}>
                        <Button
                            title="Start"
                            color="rgba(134, 65, 244, 1)"

                            onPress={() => Alert.alert('Go!!!!!!!')}
                        />
                    </View>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 0,
        margin: 8
    },
    card: {
        flex: 1,
        width: 100,
        height: 100,
        borderRadius: 4,
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card2: {
        flex: 1,
        flexGrow: 1,
        width: 100,
        height: 100,
        borderRadius: 4,
        // margin: 2,
        paddingLeft: 8,
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start'
    },
    card2Text: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '400'
    },
    card2BodyText: {
        color: '#57606f',
        fontSize: 14,
        fontWeight: '400'
    },
    cardText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    cardOne: {
        backgroundColor: 'rgba(134, 65, 244, 1)'
    },
    buttonContainer: {
        marginTop: 4
    }

})