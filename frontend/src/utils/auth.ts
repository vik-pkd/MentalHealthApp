import AsyncStorage from '@react-native-async-storage/async-storage';
import { base64_to_utf8 } from './cipher';

const AuthService = {
    checkAuthentication: async () => {
        try {
            const authToken = await AsyncStorage.getItem('authorizationToken');
            return (authToken && !isTokenExpired(authToken)) ? true : false;
        } catch (error) {
            return false;
        }
    },
};

const isTokenExpired = (token: string) => {
    try {
        // exp is expiry date in seconds
        const { exp } = JSON.parse(base64_to_utf8(token.split('.')[1]));
        return exp * 1000 < Date.now();
    } catch (error) {
        return true;
    }
};

export default AuthService;
