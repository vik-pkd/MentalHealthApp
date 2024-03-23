import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import Game from '../../components/Game';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GameStackParamList } from '../../routes/PatientStack';

const cards = [
    { id: '1', title: 'Flip Card', description: " Enhances memory recall and concentration. Improves visual recognition and pattern matching skills.", imageUrl: require('../../../assets/games/flipcard.jpg'), navigate: 'CardMatch' as keyof GameStackParamList },
    { id: '2', title: 'Quiz', description: " Enhances general knowledge and retention of information. Encourages critical thinking and problem-solving.", imageUrl: require('../../../assets/games/quiz.jpg'), navigate: 'Quiz' as keyof GameStackParamList },
];

type MemoryScreenProps = NativeStackScreenProps<GameStackParamList, 'Memory'>

const Memory = ({ navigation }: MemoryScreenProps) => {
    return (
        <ScrollView>

            {
                cards.map((card) => (
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

export default Memory;
