import React, { useState } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import client from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

export default function AddGameCategory({isVisible, onRequestClose}: {isVisible: boolean, onRequestClose: () => void}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        const gameCategoryData = {
            title: name,
            description: description,
        };
        const headers = {
            'Content-Type': 'application/json',
        };
        const response = await client.post('/games/add-game-category', gameCategoryData, { headers });
        onRequestClose();
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={[styles.labelAndInput]}>
                        <Text style={[styles.blackText]}>Game Name</Text>
                        <TextInput
                            style={[styles.blackText]}
                            onChangeText={(text) => { setName(text); }}
                        />
                    </View>
                    <View>
                        <Text style={[styles.blackText]}>Game Description</Text>
                        <TextInput
                            style={[styles.blackText]}
                            onChangeText={(text) => { setDescription(text); }}
                        />
                    </View>
                    <View style={styles.buttonSection}>
                        <Pressable onPress={handleSubmit}>
                            <View style={[styles.button]}>
                                <Text style={[styles.buttonText]}>Submit</Text>
                            </View>
                        </Pressable>
                        
                        <Pressable onPress={onRequestClose}>
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
        backgroundColor: 'white',
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
    },
    
});