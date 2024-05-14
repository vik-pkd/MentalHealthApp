import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LottieSplashScreen from "react-native-lottie-splash-screen";

//Routes
import ParentStack from './ParentStack';
import { AuthStack } from './AuthStack';
import { useLogin } from '../context/LoginProvider';
import authService from '../utils/auth';

export const Router = () => {
    // const [isLoading, setIsLoading] = useState<boolean>(true)
    // const { appwrite, isLoggedIn, setIsLoggedIn } = useContext(AppwriteContext)
    const { isLoggedIn, setIsLoggedIn } = useLogin()

    const hasAuthToken = async () => {
        const hasToken = await authService.checkAuthentication();
        setIsLoggedIn(hasToken);
    };

    useEffect(() => {
        setTimeout(() => {
            LottieSplashScreen.hide(); // here
        }, 2_000);
    }, []);

    console.log(isLoggedIn)

    return (
        <NavigationContainer>
            {isLoggedIn ? <ParentStack /> : <AuthStack />}
        </NavigationContainer>
    )
}
