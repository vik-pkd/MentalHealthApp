import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'

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

    // useEffect(() => {
    //     hasAuthToken();
    // }, []);

    console.log(isLoggedIn)

    return (
        <NavigationContainer>
            {isLoggedIn ? <ParentStack /> : <AuthStack />}
        </NavigationContainer>
    )
}
