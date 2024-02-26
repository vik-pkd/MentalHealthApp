import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GameCard from '../../components/GameCard';

const cards = [
    { id: '1', title: 'Puzzle', description: 'Solve math puzzles to sharpen your numerical skills.', imageUrl: '../puzzle-game.png', progress: 10 },
    { id: '2', title: 'Puzzle', description: 'Solve math puzzles to sharpen your numerical skills..', imageUrl: '../puzzle-game.png', progress: 20 },
    { id: '3', title: 'Puzzle', description: 'Solve math puzzles to sharpen your numerical skills.', imageUrl: '../puzzle-game.png', progress: 30 },
];

export default function Games() {
    return (
        <View>

            <View style={styles.continer}>
                <Text style={styles.title}>Train your abilities</Text>
            </View>

            <ScrollView>
                <View>
                    {cards.map((card) => (
                        <GameCard
                            key={card.id}
                            title={card.title}
                            description={card.description}
                            imageUrl={card.imageUrl}
                            progress={card.progress}
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