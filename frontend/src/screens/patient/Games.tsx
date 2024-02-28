import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GameCard from '../../components/GameCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GameStackParamList } from '../../routes/PatientStack';
import { useLogin } from '../../context/LoginProvider';

type GameScreenProps = NativeStackScreenProps<GameStackParamList, 'Games'>

const Games = ({ navigation }: GameScreenProps) => {
    const { sectionPoints, setSectionPoints } = useLogin();

    const cards = [
        { id: '1', title: 'Puzzle', description: 'Solve math puzzles to sharpen your numerical skills.', imageUrl: require('../../puzzle-game.png') },
        { id: '2', title: 'Focus', description: 'Solve math puzzles to sharpen your numerical skills..', imageUrl: require('../../puzzle-game.png') },
        { id: '3', title: 'Coordination', description: 'Solve math puzzles to sharpen your numerical skills.', imageUrl: require('../../puzzle-game.png') },
        { id: '4', title: 'IQ', description: 'Solve math puzzles to sharpen your numerical skills.', imageUrl: require('../../puzzle-game.png') },
    ].map(card => ({
        ...card,
        progress: sectionPoints && sectionPoints[card.title] ? sectionPoints[card.title] : 0,
    }));

    return (
        <View style={{ flex: 1 }}>

            <View style={styles.continer}>
                <Text style={styles.title}>Train your abilities</Text>
            </View>

            <ScrollView>
                {cards.map((card) => (

                    <TouchableOpacity onPress={() => navigation.navigate('Puzzle')} key={card.id}>

                        <GameCard
                            title={card.title}
                            description={card.description}
                            imageUrl={card.imageUrl}
                            progress={card.progress}
                            imageList={[require('../../sudoku.png'), require('../../tic-tac-toe.png'), require('../../puzzle.png')]}
                        />
                    </TouchableOpacity>
                ))}

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
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    video: {
        marginTop: 20,
        maxHeight: 200,
        width: 320,
        flex: 1
    }

})

export default Games;