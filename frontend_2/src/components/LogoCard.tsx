import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function LogoCard() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../mental_health_app.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 0,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
        fontWeight: '400',
        paddingLeft: 8,
        marginBottom: 5
    },
    card2BodyText: {
        color: '#57606f',
        fontSize: 14,
        fontWeight: '400',
        paddingLeft: 8,
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
        padding: 8,
        marginTop: 5,
        marginBottom: 5
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
    }

})