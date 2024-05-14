import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, Platform, Alert, Image, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import client from '../../api/client';

//react native elements
import { FAB } from '@rneui/themed'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//Snackbar
import Snackbar from 'react-native-snackbar'

//context API
import { AppwriteContext } from '../../appwrite/AppwriteContext'

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../routes/AuthStack';
import { useLogin } from '../../context/LoginProvider';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { authTokenActions } from '../../store/authToken-slice';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>

const Login = ({ navigation }: LoginScreenProps) => {
  const { setIsLoggedIn, setProfile } = useLogin();

  const [error, setError] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const screenHeight = Dimensions.get("window").height;

  const handleFaceID = async () => {

    // const rnBiometrics = new ReactNativeBiometrics();
    // const { available, biometryType } =
    //   await rnBiometrics.isSensorAvailable();

    // if (!available || biometryType !== BiometryTypes.Biometrics) {
    //   Alert.alert(
    //     'Oops!',
    //     'Face ID is not available on this device.',
    //   );
    //   return;
    // }

    // const userId = await AsyncStorage.getItem('userId');

    // if (!userId) {
    //   Alert.alert(
    //     'Oops!',
    //     'You have to sign in using your credentials first to enable Face ID.',
    //   );
    //   return;
    // }

    // const timestamp = Math.round(
    //   new Date().getTime() / 1000,
    // ).toString();
    // const payload = `${userId}__${timestamp}`;

    // const { success, signature } = await rnBiometrics.createSignature(
    //   {
    //     promptMessage: 'Sign in',
    //     payload,
    //   },
    // );

    // if (!success) {
    //   Alert.alert(
    //     'Oops!',
    //     'Something went wrong during authentication with Face ID. Please try again.',
    //   );
    //   return;
    // }

    // const resp = await client.post('/doctors/verify-key', { signature, payload });

    // if (resp.data.status !== 'success') {
    //   Alert.alert('Oops!', resp.data.message);
    //   return;
    // } else {
    //   Alert.alert('Success!', 'You are successfully authenticated!');
    //   setProfile(resp.data.doctor);
    //   setIsLoggedIn(true);
    //   Snackbar.show({
    //     text: 'Login success',
    //     duration: Snackbar.LENGTH_SHORT
    //   })
    // }


  }

  const handleLogin = async () => {
    if (email.length < 1 || password.length < 1) {
      setError('All fields are required')
    } else {
      const user = {
        email,
        password
      }

      const resp = await client.post('/patients/sign-in', { ...user })
      console.log('resp', resp.data);
      if (resp.data && resp.data.token) {
        dispatch(authTokenActions.set(resp.data.token));
        await AsyncStorage.setItem('authorizationToken', resp.data.token);
      }
      const userId = resp.data.patient._id;

      if (resp) {
        setProfile(resp.data.patient);

        const faceFeatures = resp.data.patient.face;

        if (faceFeatures.length === 0) {
          Alert.alert(
            'Face ID',
            'Would you like to enable Face ID authentication for the next time?',
            [
              {
                text: 'Yes please',
                onPress: async () => navigation.navigate('FaceSignup'),
              },
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: async () => {
                  if (resp) {
                    Snackbar.show({
                      text: 'Login success',
                      duration: Snackbar.LENGTH_SHORT,
                      backgroundColor: '#62a8c3',
                      marginBottom: screenHeight - 44
                    })
                    setIsLoggedIn(true);
                  }
                },
              }
            ],
          );
        } else {
          Snackbar.show({
            text: 'Login success',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#62a8c3',
            marginBottom: screenHeight - 44
          })
          setIsLoggedIn(true);
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
          <Icon name="login-variant" size={25} style={{ marginTop: 10, marginRight: 0 }} color="black" />
          <Text style={styles.btnText}>Login</Text>
        </Pressable>

        {/* Face ID button */}
        <Pressable
          onPress={() => navigation.navigate('FaceLogin')}
          style={[styles.btn, { marginTop: 20 }]}>
          <Icon name="face-recognition" size={25} style={{ marginTop: 10, marginRight: 0 }} color="black" />
          <Text style={styles.btnText}>Face ID</Text>
        </Pressable>


        {/* Face ID button */}
        <Pressable
          onPress={() => navigation.navigate('FaceLogin')}
          style={[styles.btn, { marginTop: 20, marginBottom: 25 }]}>
          <Icon name="account-voice" size={25} style={{ marginTop: 10, marginRight: 0 }} color="black" />
          <Text style={styles.btnText}>Voice ID</Text>
        </Pressable>


        {/* Sign up navigation */}
        {/* <Pressable
          onPress={() => navigation.navigate('Signup')}
          style={styles.signUpContainer}>
          <Text style={styles.noAccountLabel}>
            Don't have an account?{'  '}
            <Text style={styles.signUpLabel}>Create an account</Text>
          </Text>
        </Pressable> */}



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
    color: '#62a8c3',
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
    // padding: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',

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
    color: '#000',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 8
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
  welcome: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 15,
  },
  signUpLabel: {
    color: '#1d9bf0',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 175,
    height: 175,
    alignSelf: 'center',
  }
});

export default Login;