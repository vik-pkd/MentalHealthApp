import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import VideoCard from '../../components/VideoCard';

const cards = [
    { id: '1', title: 'Meditate', bodyText: 'Relax your mind', buttonText: 'Start Meditation', videoId: 'xRxT9cOKiM8' },
    { id: '2', title: 'Breath', bodyText: 'Perform this for 1-2 mins.', buttonText: 'Start Breathing', videoId: 'tEmt1Znux58' },
    { id: '3', title: 'Stretch', bodyText: '5-minute routine', buttonText: 'Start Stretching', videoId: 'yFBE_IBZjxY' },
];

export default function Mindefulness() {
    return (
        <View style={styles.back}>

            <View style={styles.continer}>
                <Text style={styles.title}>Popular Videos</Text>
            </View>

            <ScrollView>
                <View>
                    {cards.map((card) => (
                        <VideoCard
                            key={card.id}
                            title={card.title}
                            bodyText={card.bodyText}
                            videoId={card.videoId}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    continer: {
        borderRadius: 4,
        margin: 4,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(134, 65, 244, 1)'
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '400',
        paddingLeft: 8,
        marginBottom: 5
    },
    smallText: {
        color: '#000000'
    },
    back: {
        backgroundColor: "#fff"
    }

})