import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import Game from '../../components/Game';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GameStackParamList } from '../../routes/PatientStack';

const cards = [
    { id: '1', title: 'Fruit Slicer', description: "Enhances hand-eye coordination and reflexes. Improves focus and concentration as players react quickly to the movement of fruits.", imageUrl: require('../../../assets/games/fruitslicer.png'), navigate: 'FruitSlicer' as keyof GameStackParamList },
    { id: '2', title: 'Rock Paper Scissors', description: "Encourages quick decision-making and prediction. Enhances understanding of basic game theory and probability. ", imageUrl: require('../../../assets/games/rockpaper.png'), navigate: 'RockPaperScissors' as keyof GameStackParamList },
];

type CasualScreenProps = NativeStackScreenProps<GameStackParamList, 'Casual'>

const Casual = ({ navigation }: CasualScreenProps) => {
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

export default Casual;
