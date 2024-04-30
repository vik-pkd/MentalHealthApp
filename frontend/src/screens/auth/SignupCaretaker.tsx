import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, Platform, Image } from 'react-native'
import React, { useContext, useState } from 'react'

//Snackbar
import Snackbar from 'react-native-snackbar'

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../routes/AuthStack';
import client from '../../api/client';
import { useLogin } from '../../context/LoginProvider';

type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignupCaretaker'>

const SignupCaretaker = ({ navigation }: SignupScreenProps) => {
    const { setIsLoggedIn, setProfile } = useLogin();
    const [error, setError] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')

    const handleSignup = async () => {
        if (
            name.length < 1 ||
            email.length < 1 ||
            password.length < 1 ||
            repeatPassword.length < 1
        ) {
            setError('All fields are required');
        } else if (password !== repeatPassword) {
            setError('Passwords do not match');
        } else {
            const age = 20;
            const confirmPassword = repeatPassword;
            const user = {
                name,
                email,
                password,
                confirmPassword,
                age
            };

            const res = await client.post('/caregivers/add-caregiver', { ...user })
            if (res) {
                const resp = await client.post('/caregivers/sign-in', { email, password })
                if (resp) {
                    setProfile(resp.data.caregiver);
                    setIsLoggedIn(true);
                    Snackbar.show({
                        text: 'Login success',
                        duration: Snackbar.LENGTH_SHORT
                    })
                }
            }
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <View style={styles.formContainer}>

                <Image
                    style={styles.logo}
                    source={require('../../../assets/common/logo.png')}
                />
                <Text style={styles.appName}>Game Mind</Text>
                <Text style={styles.welcome}>
                    Welcome to the world of healing
                </Text>

                {/* Name */}
                <TextInput
                    value={name}
                    onChangeText={text => {
                        setError('');
                        setName(text);
                    }}
                    placeholderTextColor={'#AEAEAE'}
                    placeholder="Name"
                    style={styles.input}
                />

                {/* Email */}
                <TextInput
                    value={email}
                    keyboardType="email-address"
                    onChangeText={text => {
                        setError('');
                        setEmail(text);
                    }}
                    placeholderTextColor={'#AEAEAE'}
                    placeholder="Email"
                    style={styles.input}
                />

                {/* Password */}
                <TextInput
                    value={password}
                    onChangeText={text => {
                        setError('');
                        setPassword(text);
                    }}
                    placeholderTextColor={'#AEAEAE'}
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                />

                {/* Repeat password */}
                <TextInput
                    secureTextEntry
                    value={repeatPassword}
                    onChangeText={text => {
                        setError('');
                        setRepeatPassword(text);
                    }}
                    placeholderTextColor={'#AEAEAE'}
                    placeholder="Repeat Password"
                    style={styles.input}
                />

                {/* Validation error */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Signup button */}
                <Pressable
                    onPress={handleSignup}
                    style={[styles.btn, { marginTop: error ? 10 : 20 }]}>
                    <Text style={styles.btnText}>Sign Up</Text>
                </Pressable>

                {/* Login navigation */}
                <Pressable
                    onPress={() => navigation.navigate('Login')}
                    style={styles.loginContainer}>
                    <Text style={styles.haveAccountLabel}>
                        Already have an account?{'  '}
                        <Text style={styles.loginLabel}>Login</Text>
                    </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    formContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
    },
    appName: {
        color: 'rgba(134, 65, 244, 1)',
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#FCF8FF',
        padding: 10,
        height: 40,
        alignSelf: 'center',
        borderRadius: 5,

        width: '80%',
        color: '#000000',

        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 1,
    },
    errorText: {
        color: 'red',
        alignSelf: 'center',
        marginTop: 10,
    },
    btn: {
        backgroundColor: '#ffffff',
        padding: 10,
        height: 45,

        alignSelf: 'center',
        borderRadius: 5,
        width: '80%',
        marginTop: 10,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 3,
    },
    btnText: {
        color: '#484848',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    loginContainer: {
        marginTop: 60,
    },
    haveAccountLabel: {
        color: '#484848',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    welcome: {
        color: '#484848',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 15,
    },
    loginLabel: {
        color: '#1d9bf0',
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
    }
});

export default SignupCaretaker;