import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GameCard from '../../components/GameCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GameStackParamList } from '../../routes/PatientStack';
import { useLogin } from '../../context/LoginProvider';
import * as Progress from 'react-native-progress';

type GameScreenProps = NativeStackScreenProps<GameStackParamList, 'Games'>

const Games = ({ navigation }: GameScreenProps) => {
    const { sectionPoints, setSectionPoints, userPoints, profile } = useLogin();
    const cards = [
        { id: '1', title: 'Puzzle', description: 'Engage with games that challenge your problem-solving and pattern recognition skills.', imageUrl: require('../../../assets/game_types/puzzle.png'), navigate: 'Puzzle' as keyof GameStackParamList, imageList: [require('../../../assets/icons/2048.png'), require('../../../assets/icons/tetris.png'), require('../../../assets/icons/minesweeper.png')] },
        { id: '2', title: 'Focus', description: 'Hone your concentration and precision with games that require sharp attention and accuracy.', imageUrl: require('../../../assets/game_types/focus.png'), navigate: 'Focus' as keyof GameStackParamList, imageList: [require('../../../assets/icons/typing.png'), require('../../../assets/icons/maze.png'), require('../../../assets/icons/slicer.png')] },
        { id: '3', title: 'Strategy', description: 'Test and enhance your cognitive abilities with games that require strategic thinking and foresight.', imageUrl: require('../../../assets/game_types/strategy.png'), navigate: 'Strategy' as keyof GameStackParamList, imageList: [require('../../../assets/icons/2048.png'), require('../../tic-tac-toe.png'), require('../../puzzle.png')] },
        { id: '4', title: 'Memory', description: 'Boost your memory  prowess with games designed to test recall abilities and cognitive skills.', imageUrl: require('../../../assets/game_types/memory.png'), navigate: 'Memory' as keyof GameStackParamList, imageList: [require('../../../assets/icons/cardmatch.png'), require('../../../assets/icons/quiz.png')] },
        { id: '5', title: 'Coordination', description: 'Sharpen your  coordination with games that challenge your reaction speed and precision.', imageUrl: require('../../../assets/game_types/coordination.png'), navigate: 'Coordination' as keyof GameStackParamList, imageList: [require('../../../assets/icons/snake.png'), require('../../../assets/icons/crossroad.png'), require('../../../assets/icons/pingpong.png')] },
        { id: '6', title: 'Casual', description: 'Relax and unwind with games that provide entertainment and the challenge to beat your high score.', imageUrl: require('../../../assets/game_types/casual.png'), navigate: 'Casual' as keyof GameStackParamList, imageList: [require('../../../assets/icons/rock.png'), require('../../../assets/icons/slicer.png')] },
    ].map(card => ({
        ...card,
        progress: sectionPoints && sectionPoints[card.title] ? sectionPoints[card.title] : 0,
    }));

    return (
        <View style={{ flex: 1 }}>

            <View style={styles.userContainer}>
                <View style={styles.detailsAndProgress}>
                    <Text style={styles.detailsText}>Hone your abilities {profile.name}!</Text>
                </View>
            </View>

            <ScrollView>
                {cards.map((card) => (

                    <TouchableOpacity onPress={() => navigation.navigate(card.navigate)} key={card.id}>

                        <GameCard
                            title={card.title}
                            description={card.description}
                            imageUrl={card.imageUrl}
                            progress={card.progress}
                            imageList={card.imageList}
                        />
                    </TouchableOpacity>
                ))}

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    userContainer: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#6A1B9A', // Or any other color matching your theme
    },
    detailsAndProgress: {
        flex: 1,
        justifyContent: 'space-evenly', // Evenly distribute space around items
    },
    detailsText: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 4,
        alignSelf: 'center'
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
        backgroundColor: "#f4f1f4"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
})

export default Games;