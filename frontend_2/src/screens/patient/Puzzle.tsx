import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import Game from '../../components/Game';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GameStackParamList } from '../../routes/PatientStack';

const cards = [
    { id: '1', title: 'Candy Crush', description: "Teaches match-three mechanics, cascading effects, and level progression. Covers UI elements like score display, level goals, and special candy effects. ", imageUrl: require('../../../assets/games/candy.png'), navigate: 'CandyCrush' as keyof GameStackParamList },
    { id: '2', title: 'Minesweeper', description: "Enhances logical reasoning and deductive skills. Improves risk assessment and decision-making. Teaches problem-solving as players uncover safe tiles.", imageUrl: require('../../../assets/games/minesweeper.png'), navigate: 'Minesweeper' as keyof GameStackParamList },
    { id: '3', title: 'Tetris', description: "Enhances spatial awareness and pattern recognition. Improves hand-eye coordination and quick decision-making.", imageUrl: require('../../../assets/games/tetris.png'), navigate: 'Tetris' as keyof GameStackParamList },
    { id: '4', title: 'Tower Blocks', description: "Enhances fine motor skills and hand-eye coordination. Improves spatial awareness and balance as players carefully stack blocks.", imageUrl: require('../../../assets/games/tower.png'), navigate: 'Tower' as keyof GameStackParamList },
    { id: '5', title: 'Slot Game', description: " Provides entertainment with a risk-free simulation of slot machine mechanics. Enhances pattern recognition as players look for winning combinations.", imageUrl: require('../../../assets/games/slot.png'), navigate: 'Slot' as keyof GameStackParamList },
    { id: '6', title: '2048 Games', description: "Enhances strategic thinking and planning. Improves numerical and pattern recognition skills. Teaches spatial reasoning and decision-making.", imageUrl: require('../../../assets/games/2048.png'), navigate: 'TwoZero' as keyof GameStackParamList },
];

type PuzzleScreenProps = NativeStackScreenProps<GameStackParamList, 'Puzzle'>

const Puzzle = ({ navigation }: PuzzleScreenProps) => {
    return (
        <ScrollView>

            {cards.map((card) => (
                <TouchableOpacity key={card.id} onPress={() => navigation.navigate(card.navigate)}>
                    <Game
                        title={card.title}
                        description={card.description}
                        imageUrl={card.imageUrl}
                    />
                </TouchableOpacity>
            ))}

        </ScrollView>
    );
};

export default Puzzle;
