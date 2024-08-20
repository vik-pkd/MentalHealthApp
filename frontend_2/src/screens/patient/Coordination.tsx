import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import Game from '../../components/Game';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GameStackParamList } from '../../routes/PatientStack';

const cards = [
    { id: '1', title: 'Snake Game', description: "Enhances hand-eye coordination and reflexes. Improves strategic planning as players navigate and plan the snake's path.", imageUrl: require('../../../assets/games/snake.png'), navigate: 'Snake' as keyof GameStackParamList },
    { id: '2', title: 'Ping Pong', description: "Enhances hand-eye coordination and reflexes. Improves focus and concentration as players track the fast-moving ball.", imageUrl: require('../../../assets/games/pingpong.png'), navigate: 'PingPong' as keyof GameStackParamList },
    { id: '3', title: 'Crossy Road', description: "Enhances quick decision-making and reflexes. Teaches pattern recognition as players identify safe moments to advance. ", imageUrl: require('../../../assets/games/cross.png'), navigate: 'CrossRoad' as keyof GameStackParamList },
];

type CoordinationScreenProps = NativeStackScreenProps<GameStackParamList, 'Coordination'>

const Coordination = ({ navigation }: CoordinationScreenProps) => {
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

export default Coordination;
