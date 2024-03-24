import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import Game from '../../components/Game';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GameStackParamList } from '../../routes/PatientStack';

const cards = [
    { id: '1', title: 'Connect Four', description: "Teaches grid-based logic, win conditions, and turn-based gameplay.", imageUrl: require('../../../assets/games/connect.jpg'), navigate: 'ConnectFour' as keyof GameStackParamList },
    { id: '2', title: 'Speed Typing', description: "Enhances typing speed and accuracy. Improves cognitive skills, concentration, and reflexes.", imageUrl: require('../../../assets/games/typing.jpg'), navigate: 'Typing' as keyof GameStackParamList },
    { id: '3', title: 'Archery', description: " Enhances typing speed and accuracy. Improves cognitive skills, concentration, and reflexes.", imageUrl: require('../../../assets/games/archer.jpg'), navigate: 'Typing' as keyof GameStackParamList },
    { id: '4', title: 'Flappy Bird', description: "Covers side-scrolling mechanics, collision detection, and score tracking.", imageUrl: require('../../../assets/games/flappy.jpg'), navigate: 'Typing' as keyof GameStackParamList },
    { id: '5', title: 'Maze', description: " Enhances problem-solving skills and spatial awareness. Improves memory as players mentally map out the maze.", imageUrl: require('../../../assets/games/maze.jpg'), navigate: 'Typing' as keyof GameStackParamList },
    { id: '6', title: 'Tilting Maze', description: "Enhances fine motor skills as players tilt or control the movement. Improves coordination and balance. Teaches spatial orientation and problem-solving.", imageUrl: require('../../../assets/games/tilt.png'), navigate: 'Typing' as keyof GameStackParamList },
    { id: '7', title: 'Fruit Slicer', description: "Enhances hand-eye coordination and reflexes. Improves focus and concentration as players react quickly to the movement of fruits.", imageUrl: require('../../../assets/games/fruitslicer.png'), navigate: 'Typing' as keyof GameStackParamList },
];

type FocusScreenProps = NativeStackScreenProps<GameStackParamList, 'Focus'>

const Focus = ({ navigation }: FocusScreenProps) => {
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

export default Focus;
