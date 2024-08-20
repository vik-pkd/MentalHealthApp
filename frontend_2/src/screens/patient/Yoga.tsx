import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import VideoCard from '../../components/VideoCard';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MindStackParamList } from '../../routes/PatientStack';

const cards = [
    { id: '1', title: 'Yoga for Stress', bodyText: 'Get rid of stress and anxiety through deep stretch', buttonText: 'Start Yoga', videoId: 'yIcjAEs18TQ' },
    { id: '2', title: 'Pranayama', bodyText: 'Perform this for 10 mins to Calm Your Mind :)', buttonText: 'Start Breathing', videoId: 'uNmKzlh55Fo' },
    { id: '3', title: 'Hatha Yoga', bodyText: 'Traditional Yoga Practice for 19 mins', buttonText: 'Start Meditation', videoId: 'uiXAIgurwJU' },
];

type MindScreenProps = NativeStackScreenProps<MindStackParamList, 'Yoga'>

const Yoga = ({ navigation }: MindScreenProps) => {
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

export default Yoga;
