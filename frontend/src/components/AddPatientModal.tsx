import React, { useState } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import client from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

export default function AddPatientModal(props: any) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const authToken = useSelector((state: Record<string, {token : string | null}>) => state.authToken.token);

    const handleSubmit = async () => {
        const patientData = {
            name: name,
            email: email,
            password: password,
            age: age
        };
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        };
        const response = await client.post('/patients/add-patient', patientData, { headers });
        props.closeModal();
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isVisible}
            onRequestClose={props.closeModal}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={[styles.labelAndInput]}>
                        <Text style={[styles.blackText]}>Name</Text>
                        <TextInput
                            style={[styles.blackText]}
                            onChangeText={(text) => { setName(text); }}
                        />
                    </View>
                    <View>
                        <Text style={[styles.blackText]}>Email</Text>
                        <TextInput
                            style={[styles.blackText]}
                            keyboardType='email-address'
                            onChangeText={(text) => { setEmail(text); }}
                        />
                    </View>
                    <View>
                        <Text style={[styles.blackText]}>Password</Text>
                        <TextInput
                            style={[styles.blackText]}
                            secureTextEntry={true}
                            onChangeText={(text) => { setPassword(text); }}
                        />
                    </View>
                    <View>
                        <Text style={[styles.blackText]}>Age</Text>
                        <TextInput
                            style={[styles.blackText]}
                            keyboardType='numeric'
                            onChangeText={(text) => { setAge(text); }}
                        />
                    </View>
                    <View style={styles.buttonSection}>
                        <Pressable onPress={handleSubmit}>
                            <View style={[styles.button]}>
                                <Text style={[styles.buttonText]}>Submit</Text>
                            </View>
                        </Pressable>
                        
                        <Pressable onPress={props.closeModal}>
                            <View style={[styles.button]}>
                                <Text style={[styles.buttonText]}>Close</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    labelAndInput: {
        // flexDirection: 'row',
        // backgroundColor: 'red',
        marginVertical: 3
    },
    blackText: {
        color: 'black'
    },
    buttonSection: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#2196F3',
        borderRadius: 6,
        padding: 6,
        marginHorizontal: 6
    },
    buttonText: {
        color: 'white'
    }
});