import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Activity {
    type: string;
    title: string;
    pointsCollected: number;
    maxPoints: number;
    image: any;  // Adjust this as necessary to match the type used for images
    isDoctorRecommended: boolean;
}

interface Props {
    isVisible: boolean;
    onClose: () => void;
    activities: Activity[];
    navigation: any;
}

const ActivityModal: React.FC<Props> = ({ isVisible, onClose, activities, navigation }) => {

    const handleSelect = (activity: Activity) => {
        // Example of navigating to a game screen
        onClose(); // Close the modal first

        // Mapping of activity types to navigation routes
        const routeMap: { [key: string]: any } = {
            'Game': 'Games',
            'Meditation': 'Meditation',
            'Yoga': 'Yoga'
        };

        const route = routeMap[activity.type];
        if (route === 'Games') {
            navigation.navigate('GameItem', { _id: '66423d52fa325a391ddd9ce1', category: 'Strategy' });  // Passing title as _id, adjust based on actual params needed
        } else if (route === 'Meditation') {
            navigation.navigate("Zen", { screen: 'Meditation' });
        }
        else if (route === 'Yoga') {
            navigation.navigate("Zen", { screen: 'Yoga' });
        }

    };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                        {activities.map((activity, index) => (
                            <TouchableOpacity key={index} onPress={() => handleSelect(activity)}>
                                <View key={index} style={[styles.activityItem, activity.isDoctorRecommended && styles.recommended]}>
                                    <Image source={activity.image} style={styles.badgeImage} />
                                    <View style={styles.detailsAndProgress}>
                                        <Text style={styles.activityTitle}>{activity.title}</Text>
                                        <Text style={styles.activityType}>{activity.type}</Text>
                                        <Progress.Bar
                                            style={styles.progress}
                                            progress={activity.pointsCollected / activity.maxPoints}
                                            width={200}
                                            color={'#9c4dcc'}
                                            unfilledColor="rgba(255, 255, 255, 0.5)"
                                            borderColor="#ccc"
                                        />
                                        <Text style={styles.pointsText}>Points: {activity.pointsCollected} / {activity.maxPoints}</Text>
                                    </View>
                                    {activity.isDoctorRecommended && (
                                        <Ionicons name="medkit" size={24} color="#4CAF50" style={styles.medicalIcon} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalView: {
        backgroundColor: '#f4f1f4',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxWidth: '90%',
        maxHeight: '60%'
    },
    scrollContainer: {
        alignItems: 'center',
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: 300,
        position: 'relative',
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#fff',  // Neutral background for non-recommended activities
    },
    recommended: {
        backgroundColor: '#EBF4FF',  // Highlight color for recommended activities
        borderColor: '#4CAF50', // Green border color for emphasis
        borderWidth: 2,
    },
    badgeImage: {
        width: 75,
        height: 100,
        marginRight: 8,
        borderRadius: 10,
    },
    activityType: {
        fontSize: 14,
        color: 'grey',
        marginBottom: 4,
        alignSelf: 'flex-start'
    },
    activityTitle: {
        fontSize: 18,
        color: '#38006b',
    },
    detailsAndProgress: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    progress: {
        // marginTop: 4,
    },
    pointsText: {
        fontSize: 12,
        color: '#38006b',
        marginTop: 4,
    },
    closeButton: {
        backgroundColor: '#6a1b9a',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        alignSelf: 'stretch'
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    medicalIcon: {
        position: 'absolute',
        top: 10,
        right: 10,  // Positioned in the top-right corner of the activity item
    },
});

export default ActivityModal;
