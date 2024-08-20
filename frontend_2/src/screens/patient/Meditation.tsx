import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import VideoCard from '../../components/VideoCard';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MindStackParamList } from '../../routes/PatientStack';

const cards = [
    { id: '1', title: 'Meditate', bodyText: 'Relax your mind', buttonText: 'Start Meditation', videoId: 'xRxT9cOKiM8' },
    { id: '2', title: 'Breath', bodyText: 'Perform this for 1-2 mins.', buttonText: 'Start Breathing', videoId: 'tEmt1Znux58' },
    { id: '3', title: 'Meditate', bodyText: '10-minute routine', buttonText: 'Start Meditation', videoId: 'O-6f5wQXSu8' },
];

type MindScreenProps = NativeStackScreenProps<MindStackParamList, 'Meditation'>

const Meditation = ({ navigation }: MindScreenProps) => {
    return (
        <ScrollView>
            <View>
                {cards.map((card) => (
                    <VideoCard
                        key={card.id}
                        title={card.title}
                        bodyText={card.bodyText}
                        videoId={card.videoId}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

export default Meditation;
