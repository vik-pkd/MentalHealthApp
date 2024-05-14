import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../routes/AuthStack';
import { useLogin } from '../context/LoginProvider';

type LaunchScreenProps = NativeStackScreenProps<AuthStackParamList, 'Launch'>

export default function Launch({ navigation }: LaunchScreenProps) {
    const { setUserCategory } = useLogin();

    const handleDoctorPress = async () => {
        setUserCategory('doctor');
        navigation.navigate('LoginDoctor')
    }

    const handlePatientPress = async () => {
        setUserCategory('patient');
        navigation.navigate('Login')
    }

    const handleCaretakerPress = async () => {
        setUserCategory('caretaker');
        navigation.navigate('LoginCaretaker')
    }


    return (
        <View style={styles.mainContainer}>
            <Text style={styles.appName}>Game Mind</Text>
            <TouchableOpacity style={styles.container} onPress={handleDoctorPress}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/common/doctor.jpg')}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.container} onPress={handlePatientPress}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/common/patient.jpg')}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.container} onPress={handleCaretakerPress}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/common/caretaker.jpg')}
                />
            </TouchableOpacity>

        </View >
    )
}

const styles = StyleSheet.create({
    appName: {
        color: '#62a8c3',
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10,
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        backgroundColor: '#F5F9FA',
        borderRadius: 8,
        padding: 0,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '45%'
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
    }

})