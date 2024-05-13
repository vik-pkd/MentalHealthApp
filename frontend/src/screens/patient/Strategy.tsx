import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import Game from '../../components/Game';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GameStackParamList } from '../../routes/PatientStack';

const cards = [
    { id: '1', title: 'Tic Tac Toe', description: "Boosts strategic thinking, pattern recognition, and spatial awareness. Enhances decision-making by teaching players to anticipate and block opponent moves.", imageUrl: require('../../../assets/games/tic-tac-toe.png'), navigate: 'TicTacToe' as keyof GameStackParamList },
    { id: '2', title: 'Hangman', description: "Covers word manipulation, user input validation, and game state management.", imageUrl: require('../../../assets/games/hangman.png'), navigate: 'Hangman' as keyof GameStackParamList },
    { id: '3', title: '2048 Games', description: "Enhances strategic thinking and planning. Improves numerical and pattern recognition skills. Teaches spatial reasoning and decision-making.", imageUrl: require('../../../assets/games/2048.png'), navigate: 'TwoZero' as keyof GameStackParamList },
];

type StrategyScreenProps = NativeStackScreenProps<GameStackParamList, 'Strategy'>

const Strategy = ({ navigation }: StrategyScreenProps) => {
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

export default Strategy;
