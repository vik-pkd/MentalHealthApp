import { StyleSheet, Text, View, ScrollView, Image, Animated } from 'react-native'
import FancyCard from '../../components/FancyCard'
import BasicCard from '../../components/BasicCard'
import HistoryCard from '../../components/HistoryCards'
import { FAB } from '@rneui/themed'
import Snackbar from 'react-native-snackbar'
import React, { useContext, useState, useEffect } from 'react'
import * as Progress from 'react-native-progress';

//context API
import { AppwriteContext } from '../../appwrite/AppwriteContext'
import { useLogin } from '../../context/LoginProvider';

type UserObj = {
    name: String;
    email: String;
}

export default function Home() {
    const { setIsLoggedIn, profile, userCategory, userPoints } = useLogin();
    const moveAnim = new Animated.Value(0);

    const handleLogout = () => {

        setIsLoggedIn(false);
        Snackbar.show({
            text: 'Logout Successful',
            duration: Snackbar.LENGTH_SHORT
        });

    }

    // Define the animation sequence
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(moveAnim, {
                    toValue: -10, // Move up
                    duration: 1000, // Duration of the move up
                    useNativeDriver: true
                }),
                Animated.timing(moveAnim, {
                    toValue: 0, // Move back to initial position
                    duration: 1000, // Duration of the move down
                    useNativeDriver: true
                })
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView stickyHeaderIndices={[0]}>
                <View style={styles.stickyHeader}>
                    {profile && (
                        <View style={styles.userContainer}>
                            <Animated.View style={[styles.userContainer, { transform: [{ translateY: moveAnim }] }]}>
                                <Image source={require('../../gold1.png')} style={styles.badgeImage} />
                                {/* ... */}
                            </Animated.View>
                            <View style={styles.detailsAndProgress}>
                                <Text style={styles.detailsText}>Welcome {profile.name}!</Text>
                                <Progress.Bar
                                    style={styles.progress}
                                    progress={userPoints / 100} // Assuming 1000 is the max points
                                    width={200}
                                    color="red"
                                    unfilledColor="rgba(255, 255, 255, 0.5)"
                                    borderColor="rgba(255, 255, 255, 0)"
                                />
                                <Text style={styles.pointsText}>Points: {userPoints} / 1000</Text>
                            </View>
                        </View>
                    )}
                </View>
                <FancyCard />
                <BasicCard />
                {/* <HistoryCard /> */}
            </ScrollView>
            <FAB
                placement="right"
                color='#6A1B9A'
                size="large"
                title="Logout"
                icon={{ name: 'logout', color: '#FFFFFF' }}
                onPress={handleLogout}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f8', // Or any other color matching your theme
    },
    stickyHeader: {
        backgroundColor: '#6A1B9A', // Or any other color matching your theme
        marginBottom: 8
    },
    userContainer: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#6A1B9A', // Or any other color matching your theme
    },
    badgeImage: {
        width: 60,
        height: 60,
        marginRight: 16, // Space between the badge image and the details
    },
    detailsAndProgress: {
        flex: 1,
        justifyContent: 'space-evenly', // Evenly distribute space around items
    },
    detailsText: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 4,
    },
    pointsText: {
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 4,
    },
    progress: {
        marginTop: 4,
    },
    // The rest of your styles...
});
