import { Text, StyleSheet, View, Image } from 'react-native'
import React, { Component } from 'react'
import { Dimensions } from "react-native";
import * as Progress from 'react-native-progress';
const screenWidth = Dimensions.get("window").width;


interface GameCardProps {
    title: string;
    description: string;
    imageUrl: string;
    progress: number;
}


const GameCard: React.FC<GameCardProps> = ({ title, description, imageUrl, progress }) => {
    return (
        <View style={[styles.card, styles.cardElevated]}>

            <View style={styles.cardBody}>
                <View style={styles.cardContent}>
                    <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{title}</Text>
                        <Text style={styles.cardDescription}>{description}</Text>
                        <Image
                            style={styles.gameIcon}
                            source={require('../puzzle-game.png')}
                        />
                    </View>
                    <Image
                        style={styles.cardImage}
                        source={require('../puzzle-game.png')}
                    />
                </View>
                <View style={styles.progressContainer}>
                    <Progress.Bar progress={progress / 100} width={null} color={'rgba(134, 65, 244, 1)'} animationType="spring" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: screenWidth - 16,
        height: 150,
        borderRadius: 6,
        marginHorizontal: 8,
        margin: 8
    },
    cardElevated: {
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowOffset: {
            width: 1,
            height: 1
        }
    },
    cardImage: {
        width: 100, // Adjust width as needed
        height: 120, // Adjust height as needed
    },
    gameIcon: {
        width: 50,
        height: 50
    },
    cardBody: {
        flex: 1,
        flexGrow: 1,
        paddingHorizontal: 8
    },
    cardTitle: {
        color: '#000000',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 0,
        marginTop: 8
    },
    cardContent: {
        flexDirection: 'row', // Aligns children (card body and image) in a row
        justifyContent: 'space-between', // Spreads the children across the container's main axis
    },
    cardLabel: {
        color: '#000000',
        fontSize: 14,
        marginBottom: 4
    },
    cardDescription: {
        color: '#57606f',
        fontSize: 13,
        marginTop: 6
    },
    cardFooter: {
        color: '#34495e'
    },
    progressContainer: {
        marginTop: 2,
        paddingHorizontal: 8
    },
})

export default GameCard;