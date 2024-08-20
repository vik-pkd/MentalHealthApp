import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { Component, useEffect } from 'react'
import { Dimensions } from "react-native";
import * as Progress from 'react-native-progress';
const screenWidth = Dimensions.get("window").width;


interface GameCardProps {
    title: string;
    description: string;
    imageUrl: number;
    cardStyle?: any;
    categoryTitle?: string;
}


const Game: React.FC<GameCardProps> = ({ title, description, imageUrl, cardStyle, categoryTitle }) => {

    useEffect(() => {
        console.log('image URL : ', imageUrl);
    });

    return (
        // Main card starts here
        <View style={[styles.card, styles.cardElevated]}>
            <View style={[styles.cardBody, cardStyle]}>
                <View style={styles.cardContent}>

                    <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{title}</Text>
                        {/* {categoryTitle && <Text style={styles.cardSubTitle}>{categoryTitle}</Text>} */}
                        <Text style={styles.cardDescription}>{description}</Text>
                    </View>
                    <Image
                        style={styles.cardImage}
                        source={imageUrl}
                    />
                </View>
            </View >
        </View  >
    )
}

const styles = StyleSheet.create({
    card: {
        // width: '100%',
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
        height: 150, // Adjust height as needed
    },
    // gameIcon: {
    //     width: 50,
    //     height: 50
    // },
    cardBody: {
        flex: 1,
        flexGrow: 1,
        paddingHorizontal: 8
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressContent: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardTitle: {
        color: '#38006b',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 8
    },
    cardDescription: {
        color: '#57606f',
        fontSize: 13,
    },
    cardSubTitle: {
        color: '#6a1b9a',
        fontSize: 16,
        fontWeight: 'bold',
    },
    progressContainer: {
        marginTop: 0,
        paddingHorizontal: 8
    },
    imagesList: {
        marginTop: 8,
        marginBottom: 8,
        paddingHorizontal: 8,
    },
    listImage: {
        width: 32, // Adjust based on your needs
        height: 32, // Adjust based on your needs
        marginRight: 8,
    },
})

export default Game;