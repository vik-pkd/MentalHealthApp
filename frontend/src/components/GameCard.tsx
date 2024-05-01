import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { Component, useEffect } from 'react'
import { Dimensions } from "react-native";
import * as Progress from 'react-native-progress';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


interface GameCardProps {
    title: string;
    description: string;
    imageUrl: number;
    progress: number;
    imageList: number[];
}


const GameCard: React.FC<GameCardProps> = ({ title, description, imageUrl, progress, imageList }) => {


    return (
        // Main card starts here
        <View style={[styles.card, styles.cardElevated]}>
            <View style={styles.cardBody}>
                <View style={styles.cardContent}>

                    <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{title}</Text>
                        <Text style={styles.cardDescription}>{description}</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesList}>
                            {imageList.map((img, index) => (
                                <Image key={index} source={img} style={styles.listImage} />
                            ))}
                        </ScrollView>
                    </View>
                    <Image
                        style={styles.cardImage}
                        source={imageUrl}
                    />
                </View>

                <View style={styles.progressContainer}>
                    {/* <Text style={styles.cardDescription}>{progress}/100 points</Text> */}
                    <Progress.Bar progress={progress / 100} width={null} height={14} color={'#9c4dcc'} animationType="spring" >
                        <Text style={{ position: 'absolute', flex: 0, color: 'black', fontSize: 10, paddingHorizontal: 4 }}>{progress}/100 Mental Points</Text>
                    </Progress.Bar>
                </View>
            </View >
        </View  >
    )
}

const styles = StyleSheet.create({
    card: {
        width: screenWidth - 16,
        height: screenHeight / 4,
        borderRadius: 6,
        marginHorizontal: 8,
        margin: 8,
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
        marginTop: 32,
        marginRight: 16,
        width: 85, // Adjust width as needed
        height: 85, // Adjust height as needed
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
        marginBottom: 4,
        marginTop: 8
    },
    cardDescription: {
        color: '#57606f',
        fontSize: 13,
    },
    progressContainer: {
        marginTop: 0,
        paddingHorizontal: 8
    },
    imagesList: {
        marginTop: 12,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    listImage: {
        width: 32, // Adjust based on your needs
        height: 32, // Adjust based on your needs
        marginRight: 8,
    },
})

export default GameCard;