import { StyleSheet, Text, View, ScrollView } from 'react-native'
import FancyCard from '../components/FancyCard'
import BasicCard from '../components/BasicCard'
import HistoryCard from '../components/HistoryCards'
import { FAB } from '@rneui/themed'
import Snackbar from 'react-native-snackbar'
import React, { useContext, useState, useEffect } from 'react'

//context API
import { AppwriteContext } from '../appwrite/AppwriteContext'
import { useLogin } from '../context/LoginProvider';
import { Button } from '@rneui/base'
import AddPatientModal from '../components/AddPatientModal'
import AsyncStorage from '@react-native-async-storage/async-storage'

type UserObj = {
    name: String;
    email: String;
}

export default function Home() {
    const { setIsLoggedIn, profile } = useLogin();
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('authorizationToken');
        setIsLoggedIn(false);
        Snackbar.show({
            text: 'Logout Successful',
            duration: Snackbar.LENGTH_SHORT
        });

    }
    
    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    }

    // useEffect(() => {
    //     appwrite.getCurrentUser()
    //     .then(response => {
    //     if (response) {
    //         const user: UserObj = {
    //         name: response.name,
    //         email: response.email
    //         }
    //         setUserData(user)
    //     }
    //     })
    // }, [appwrite])

    return (
        <View>
            {/* <Text>Home</Text> */}
            <ScrollView>
                {profile && (
                    <View style={styles.userContainer}>
                        <Text style={styles.userDetails}>Name: {profile.name}</Text>
                        <Text style={styles.userDetails}>Email: {profile.email}</Text>
                    </View>
                )}
                <Button
                    onPress={openModal}
                    title={'Add Patient'}
                />
                <FancyCard />
                <BasicCard />
                {/* <HistoryCard /> */}

            </ScrollView>
            <FAB
                placement="right"
                color='rgba(134, 65, 244, 1)'
                size="large"
                title="Logout"
                icon={{ name: 'logout', color: '#FFFFFF' }}
                onPress={handleLogout}
            />
            <AddPatientModal isVisible={modalVisible} closeModal={closeModal}/>
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
    }

})