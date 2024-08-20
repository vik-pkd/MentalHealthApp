import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { Dimensions } from "react-native";
import * as Progress from 'react-native-progress';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

interface VideoCardProps {
    title: string;
    description: string;
    imageUrl: number;
    progress: number;
}

const VideoCategory: React.FC<VideoCardProps> = ({ title, description, imageUrl, progress }) => {
    return (
        <View style={styles.card}>
            {/* Image at the top covering the full card width */}
            <Image
                style={styles.cardImage}
                source={imageUrl}
            />
            {/* Content container for title, description, and progress */}
            <View style={styles.contentContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>
                <View style={styles.progressContainer}>
                    <Progress.Bar
                        progress={progress / 5}
                        width={screenWidth - 32} // Take into account padding
                        height={14}
                        color={'#9c4dcc'}
                        animationType="spring"
                    />
                    <Text style={{ position: 'absolute', flex: 0, color: 'black', fontSize: 10, paddingHorizontal: 4 }}>{progress}/5 Mental Points</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        overflow: 'hidden',
        marginHorizontal: 8,
        marginVertical: 8,
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardImage: {
        width: screenWidth - 16, // Adjust for margin
        height: 200, // Set a fixed height or make it responsive
    },
    contentContainer: {
        padding: 8,
    },
    cardTitle: {
        color: '#38006b',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardDescription: {
        color: '#57606f',
        fontSize: 14,
        marginBottom: 8,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default VideoCategory;
