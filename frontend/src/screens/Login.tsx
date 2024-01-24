import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, Platform, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import client from '../api/client';

//react native elements
import { FAB } from '@rneui/themed'
//Snackbar
import Snackbar from 'react-native-snackbar'

//context API
import { AppwriteContext } from '../appwrite/AppwriteContext'

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../routes/AuthStack';
import { useLogin } from '../context/LoginProvider';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import { authTokenActions } from '../store/authToken-slice';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>

const Login = ({ navigation }: LoginScreenProps) => {
  const { setIsLoggedIn, setProfile } = useLogin();

  const [error, setError] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();


  const handleFaceID = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const { available, biometryType } =
      await rnBiometrics.isSensorAvailable();

    if (!available || biometryType !== BiometryTypes.Biometrics) {
      Alert.alert(
        'Oops!',
        'Face ID is not available on this device.',
      );
      return;
    }

    const userId = await AsyncStorage.getItem('userId');

    if (!userId) {
      Alert.alert(
        'Oops!',
        'You have to sign in using your credentials first to enable Face ID.',
      );
      return;
    }

    const timestamp = Math.round(
      new Date().getTime() / 1000,
    ).toString();
    const payload = `${userId}__${timestamp}`;

    const { success, signature } = await rnBiometrics.createSignature(
      {
        promptMessage: 'Sign in',
        payload,
      },
    );

    if (!success) {
      Alert.alert(
        'Oops!',
        'Something went wrong during authentication with Face ID. Please try again.',
      );
      return;
    }

    const resp = await client.post('/doctors/verify-key', { signature, payload });

    if (resp.data.status !== 'success') {
      Alert.alert('Oops!', resp.data.message);
      return;
    } else {
      Alert.alert('Success!', 'You are successfully authenticated!');
      setProfile(resp.data.doctor);
      setIsLoggedIn(true);
      Snackbar.show({
        text: 'Login success',
        duration: Snackbar.LENGTH_SHORT
      })
    }
  }

  const handleLogin = async () => {
    if (email.length < 1 || password.length < 1) {
      setError('All fields are required')
    } else {
      const user = {
        email,
        password
      }

      const resp = await client.post('/doctors/sign-in', { ...user })
      if (resp.data && resp.data.token) {
        dispatch(authTokenActions.set(resp.data.token));
        await AsyncStorage.setItem('authorizationToken', resp.data.token);
      }
      const userId = resp.data.doctor._id;

      const rnBiometrics = new ReactNativeBiometrics();

      const { available, biometryType } = await rnBiometrics.isSensorAvailable();
      console.log(`available : ${biometryType}`)

      if (available && biometryType === BiometryTypes.Biometrics) {
        Alert.alert(
          'Face ID',
          'Would you like to enable Face ID authentication for the next time?',
          [
            {
              text: 'Yes please',
              onPress: async () => {
                const { publicKey } = await rnBiometrics.createKeys();
                // `publicKey` has to be saved on the user's entity in the database
                const resp = await client.post('/doctors/save-key', { userId, publicKey })
                console.log(resp.data);

                // save `userId` in the local storage to use it during Face ID authentication
                await AsyncStorage.setItem('userId', userId);

                if (resp) {
                  setProfile(resp.data.doctor);
                  setIsLoggedIn(true);
                  Snackbar.show({
                    text: 'Login success',
                    duration: Snackbar.LENGTH_SHORT
                  })
                }
              },
            },
            { text: 'Cancel', style: 'cancel' },
          ],
        );
      }
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Game Mind</Text>

        {/* Email */}
        <TextInput
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Email"
          style={styles.input}
        />

        {/* Password */}
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Login button */}
        <Pressable
          onPress={handleLogin}
          style={[styles.btn, { marginTop: error ? 10 : 20 }]}>
          <Text style={styles.btnText}>Login</Text>
        </Pressable>

        {/* Face ID button */}
        <Pressable
          onPress={handleFaceID}
          style={[styles.btn, { marginTop: error ? 10 : 20 }]}>
          <Text style={styles.btnText}>Face ID</Text>
        </Pressable>


        {/* Sign up navigation */}
        <Pressable
          onPress={() => navigation.navigate('Signup')}
          style={styles.signUpContainer}>
          <Text style={styles.noAccountLabel}>
            Don't have an account?{'  '}
            <Text style={styles.signUpLabel}>Create an account</Text>
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
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fef8fa',
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
    marginTop: 20,

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
  signUpContainer: {
    marginTop: 80,
  },
  noAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signUpLabel: {
    color: '#1d9bf0',
  },
});

export default Login;