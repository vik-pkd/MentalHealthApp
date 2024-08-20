import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import VideoCard from '../../components/VideoCard';
import { useLogin } from '../../context/LoginProvider';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MindStackParamList } from '../../routes/PatientStack';
import GameCard from '../../components/GameCard';
import VideoCategory from '../../components/VideoCategory';

type MindScreenProps = NativeStackScreenProps<MindStackParamList, 'Mindfulness'>

// const cards = [
//     { id: '1', title: 'Meditate', bodyText: 'Relax your mind', buttonText: 'Start Meditation', videoId: 'xRxT9cOKiM8' },
//     { id: '2', title: 'Breath', bodyText: 'Perform this for 1-2 mins.', buttonText: 'Start Breathing', videoId: 'tEmt1Znux58' },
//     { id: '3', title: 'Stretch', bodyText: '5-minute routine', buttonText: 'Start Stretching', videoId: 'yFBE_IBZjxY' },
// ];

const Mindfulness = ({ navigation }: MindScreenProps) => {
    const { sectionPoints, profile } = useLogin();
    const cards = [
        { id: '1', title: 'Meditation', description: 'ultivate mindfulness and enhance your mental clarity through guided meditation sessions designed to promote relaxation and stress relief.', imageUrl: require('../../../assets/mindfullness/meditation.png'), navigate: 'Meditation' as keyof MindStackParamList },
        { id: '2', title: 'Yoga', description: 'Improve flexibility, balance, and overall well-being through yoga practices tailored to unify the body, mind, and spirit.', imageUrl: require('../../../assets/mindfullness/yoga.png'), navigate: 'Yoga' as keyof MindStackParamList },
        { id: '3', title: 'Excercise', description: 'Boost your physical health and endurance with a variety of exercises aimed at increasing strength, agility, and cardiovascular fitness.', imageUrl: require('../../../assets/mindfullness/excercise.png'), navigate: 'Excercise' as keyof MindStackParamList },
    ].map(card => ({
        ...card,
        progress: sectionPoints && sectionPoints[card.title] ? sectionPoints[card.title] : 0,
    }));


    return (
        <View style={{ flex: 1 }}>

            <View style={styles.userContainer}>
                <View style={styles.detailsAndProgress}>
                    <Text style={styles.detailsText}>Calm your mind {profile.name}!</Text>
                </View>
            </View>


            <ScrollView>
                {cards.map((card) => (

                    <TouchableOpacity onPress={() => navigation.navigate(card.navigate)} key={card.id}>

                        <VideoCategory
                            title={card.title}
                            description={card.description}
                            imageUrl={card.imageUrl}
                            progress={card.progress}
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

export default Mindfulness;