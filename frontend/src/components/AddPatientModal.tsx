import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import client from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddPatientModal(props: any) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = async () => {
        const patientData = {
            name: name,
            email: email,
            password: password,
            age: age
        };
        const authToken = await AsyncStorage.getItem('authorizationToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        };
        const response = await client.post('/patients/add-patient', patientData, {headers});
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
                    <View>
                        <Text style={[styles.inputText]}>Name</Text>
                        <TextInput
                            style={[styles.inputText]}
                            onChangeText={(text) => { setName(text); }}
                        />
                    </View>
                    <View>
                        <Text style={[styles.inputText]}>Email</Text>
                        <TextInput
                            style={[styles.inputText]}
                            keyboardType='email-address'
                            onChangeText={(text) => { setEmail(text); }}
                        />
                    </View>
                    <View>
                        <Text style={[styles.inputText]}>Password</Text>
                        <TextInput
                            style={[styles.inputText]}
                            secureTextEntry={true}
                            onChangeText={(text) => { setPassword(text); }}
                        />
                    </View>
                    <View>
                        <Text style={[styles.inputText]}>Age</Text>
                        <TextInput
                            style={[styles.inputText]}
                            keyboardType='numeric'
                            onChangeText={(text) => { setAge(text); }}
                        />
                    </View>
                    <Button title='Submit' onPress={handleSubmit} />
                    <Button title="Close Modal" onPress={props.closeModal} />
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
    inputText: {
        color: 'black'
    }
});