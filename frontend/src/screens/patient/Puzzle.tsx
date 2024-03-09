import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import Game from '../../components/Game';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GameStackParamList } from '../../routes/PatientStack';

const cards = [
    { id: '1', title: 'Tic Tac Toe', description: "Boosts strategic thinking, pattern recognition, and spatial awareness. Enhances decision-making by teaching players to anticipate and block opponent moves.", imageUrl: require('../../tic-tac-toe-main.png'), progress: 0 },
];

type PuzzleScreenProps = NativeStackScreenProps<GameStackParamList, 'Puzzle'>

const Puzzle = ({ navigation }: PuzzleScreenProps) => {
    return (
        <ScrollView>

            {cards.map((card) => (
                <TouchableOpacity key={card.id} onPress={() => navigation.navigate('TicTacToe')}>
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
