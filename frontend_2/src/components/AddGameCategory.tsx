import React, { useState } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import client from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import globalStyles from '../constants/styles';

export default function AddGameCategory({ isVisible, onRequestClose }: { isVisible: boolean, onRequestClose: () => void }) {
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
                    <Text style={[globalStyles.lightText, styles.modalTitle]}>Add Game Category</Text>
                    <View style={[styles.labelAndInput]}>
                        {/* <Text style={[globalStyles.lightText]}>Game Name</Text> */}
                        <TextInput
                            placeholder='Category Name'
                            style={styles.input}
                            onChangeText={(text) => { setName(text); }}
                        />
                    </View>
                    <View>
                        {/* <Text style={[globalStyles.lightText]}>Game Description</Text> */}
                        <TextInput
                            placeholder='Category Description'
                            style={styles.input}
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
        backgroundColor: '#000',
    },
    content: {
        backgroundColor: '#000',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        alignSelf: 'center'
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
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#9c4dcc',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 6,
    },
    buttonText: {
        color: '#f4f1f4'
    },
    input: {
        height: 40,
        borderColor: '#f4f1f4',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});