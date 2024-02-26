import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { FAB } from '@rneui/themed'
import Snackbar from 'react-native-snackbar'
import React, { useContext, useState, useEffect } from 'react'

import { useLogin } from '../../context/LoginProvider';
import FlatCardsVertical from '../../components/FlatCardsVertical'

type UserObj = {
    name: String;
    email: String;
}

export default function DoctorDashboard() {
    const { setIsLoggedIn, profile, userCategory } = useLogin();

    const handleLogout = () => {

        setIsLoggedIn(false);
        Snackbar.show({
            text: 'Logout Successful',
            duration: Snackbar.LENGTH_SHORT
        });

    }

    return (
        <View>
            <ScrollView>
                {profile && (
                    <View style={styles.userContainer}>
                        <Text style={styles.userDetails}>Type: {userCategory}</Text>
                        <Text style={styles.userDetails}>Name: {profile.name}</Text>
                        <Text style={styles.userDetails}>Email: {profile.email}</Text>
                    </View>
                )}
                <Text style={styles.cardTitle}>Past Appointments</Text>
                <FlatCardsVertical />
                <FlatCardsVertical />
                <FlatCardsVertical />
                <FlatCardsVertical />
                <FlatCardsVertical />
                <FlatCardsVertical />

            </ScrollView>
            <FAB
                placement="right"
                color='rgba(134, 65, 244, 1)'
                size="large"
                title="Logout"
                icon={{ name: 'logout', color: '#FFFFFF' }}
                onPress={handleLogout}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    continer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    smallText: {
        color: '#000000'
    },
    userContainer: {
        flex: 1,
        borderRadius: 4,
        margin: 8,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(134, 65, 244, 1)'
    },
    userDetails: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    cardTitle: {
        color: '#000000',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
        marginTop: 4,
        alignSelf: 'center'
    },

})