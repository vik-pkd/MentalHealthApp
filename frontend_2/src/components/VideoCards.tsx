import {
    StyleSheet, Text, View,
    Button,
    SafeAreaView,
    Alert,
    ScrollView
} from 'react-native'
import React, { useState, useCallback, useRef } from "react";
import YoutubePlayer from "react-native-youtube-iframe";

const cards = [
    { id: '1', title: 'Meditate', bodyText: 'Relax your mind', buttonText: 'Start Meditation', videoId: 'xRxT9cOKiM8' },
    { id: '2', title: 'Breath', bodyText: 'Perform this for 1-2 mins.', buttonText: 'Start Breathing', videoId: 'tEmt1Znux58' },
    { id: '3', title: 'Stretch', bodyText: '5-minute routine', buttonText: 'Start Stretching', videoId: 'yFBE_IBZjxY' },
];

export default function FlatCardsVertical() {
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);


    return (
        <ScrollView>
            <View>
                {cards.map((card) => (
                    <View key={card.id} style={styles.container}>
                        <YoutubePlayer
                            height={200}
                            play={playing}
                            videoId={card.videoId}
                            onChangeState={onStateChange}
                        />

                        <Text style={styles.card2Text}>{card.title}</Text>
                        <Text style={styles.card2BodyText}>Perform this for 1-2 mins to gain health points!</Text>
                        <View style={styles.buttonContainer}>
                            <Button title={playing ? "pause" : "play"} onPress={togglePlaying} color="rgba(134, 65, 244, 1)" />
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
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
    }

})