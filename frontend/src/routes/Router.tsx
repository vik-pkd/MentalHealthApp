import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AppwriteContext } from '../appwrite/AppwriteContext';
import Loading from '../components/Loading';

//Routes
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import axios from 'axios';
import { useLogin } from '../context/LoginProvider';



export const Router = () => {
    // const [isLoading, setIsLoading] = useState<boolean>(true)
    // const { appwrite, isLoggedIn, setIsLoggedIn } = useContext(AppwriteContext)
    const { isLoggedIn } = useLogin()

    const fetchApi = async () => {
        try {
            const res = await axios.get("http://192.168.11.2:5000/");
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     // fetchApi();

    //     appwrite
    //         .getCurrentUser()
    //         .then(response => {
    //             setIsLoading(false)
    //             if (response) {
    //                 setIsLoggedIn(true)
    //             }
    //         })
    //         .catch(_ => {
    //             setIsLoading(false)
    //             setIsLoggedIn(false)
    //         })
    // }, [appwrite, setIsLoggedIn])

    // if (isLoading) {
    //     return <Loading />
    // }

    console.log(isLoggedIn)

    return (
        <NavigationContainer>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
            {/* <AppStack/> */}
        </NavigationContainer>
    )
}
