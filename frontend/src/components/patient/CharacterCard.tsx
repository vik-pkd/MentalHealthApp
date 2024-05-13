import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface StatBarProps {
    category: string;
    value: number;
    maxValue: number;
}

const StatBar: React.FC<StatBarProps> = ({ category, value, maxValue }) => {
    const filledBarWidth = (value / maxValue) * 100 + '%'; // Calculate the filled portion of the bar
    return (
        <View style={styles.statBarContainer}>
            <Text style={styles.statCategory}>{category}</Text>
            <View style={styles.statBar}>
                <View style={[styles.filledStatBar, { width: filledBarWidth }]} />
            </View>
        </View>
    );
};

const CharacterCard: React.FC = () => {
    // Dummy data for stats
    const stats: Record<string, number> = {
        Puzzle: 60,
        Focus: 80,
        Strategy: 75,
        Memory: 90,
        Coordination: 65,
        Casual: 50
    };

    return (
        <View style={styles.cardContainer}>

            {/* Character details section */}
            {/* <View style={styles.characterDetailsSection}>
                <Image
                    source={require('../../../assets/avatars/test.png')} // Replace with your image
                    resizeMode="contain"
                    style={styles.image}
                />
                <Text style={styles.name}>Amy</Text>
                <Text style={styles.title}>Forest Fighter</Text>
                <View style={styles.footer}>
                    <Icon name="flash" size={20} color="#FFD700" />
                    <Text style={styles.xp}>150 MP</Text>
                </View>
            </View> */}

            {/* Stats section */}
            <View style={styles.statsSection}>
                {Object.entries(stats).map(([key, value]) => (
                    <StatBar key={key} category={key} value={value} maxValue={100} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#6A1B9A', // Deep purple background color
        borderRadius: 6,
        padding: 20,
        // width: 345, // Adjust width as needed for the wider card look
        justifyContent: 'flex-start', // Align to the start of the container
        alignItems: 'center', // Center items vertically
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 8
    },
    characterDetailsSection: {
        alignItems: 'center',
        // marginLeft: 20,
        marginRight: 16
    },
    header: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        // justifyContent: 'space-between',
        // alignItems: 'center'
        // position: 'absolute',
        // top: 20,
        // left: 20,
    },
    image: {
        width: 80,
        height: 80,
        marginVertical: 10,
    },
    name: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        // position: 'absolute',
        // bottom: 20,
        // left: 20,
    },
    xp: {
        color: '#FFFFFF',
        marginLeft: 5,
    },
    statsSection: {

        flex: 1,
        justifyContent: 'center',
        marginTop: 8
        // marginRight: 20,
    },
    statBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    statCategory: {
        color: '#FFFFFF',
        fontSize: 12,
        marginRight: 5,
        width: 80, // Set a fixed width for the category labels
    },
    statBar: {
        flex: 1,
        height: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        overflow: 'hidden',
    },
    filledStatBar: {
        height: 8,
        backgroundColor: '#FFD700',
        borderRadius: 4,
    },
});

export default CharacterCard;
