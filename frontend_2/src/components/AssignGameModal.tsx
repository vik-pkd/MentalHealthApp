import React, { useEffect, useState } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import client from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchGameCategories } from '../store/gameCategories-slice';
import { RootState } from '../store/rootReducer';
import Game from './Game';
import globalStyles from '../constants/styles';

type GameData = {
    _id: string;
    title: string;
    description: string;
    category: string;
};

const gameImages: { [key: string]: any } = {
    'Crossy Road': require('../../assets/games/cross.png'),
    'Tic Tac Toe': require('../../assets/games/tic-tac-toe.png'),
};

const AssignGameModal = ({ isVisible, onRequestClose, patientId }: { isVisible: boolean; onRequestClose: () => void; patientId: string }) => {
    const authToken = useSelector((state: Record<string, { token: string | null }>) => state.authToken.token);
    const dispatch = useDispatch<AppDispatch>();
    const [gameList, setGameList] = useState<GameData[]>([]);
    const [selectedGames, setSelectedGames] = useState<boolean[]>([]);

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${authToken}`
        };
        const fetchData = async () => {
            const resp = await client.get('/games/all-games', { headers });
            console.log('resp.data', resp.data);
            if (resp.data && resp.data.status === 'success') {
                setGameList(resp.data.games);
                const updatedSelectedGames: boolean[] = [];
                for (let i = 0; i < resp.data.games.length; i++) {
                    updatedSelectedGames.push(false);
                }
                setSelectedGames(updatedSelectedGames);
            }
        };
        fetchData();
    }, []);

    const handleSelectGame = (index: number) => {
        const updatedSelectedGames: boolean[] = JSON.parse(JSON.stringify(selectedGames));
        updatedSelectedGames[index] = !updatedSelectedGames[index];
        setSelectedGames(updatedSelectedGames);
    };

    const handleSubmit = async () => {
        const gamesToBeAdded: string[] = [];
        for (let gameListIndex = 0; gameListIndex < gameList.length; gameListIndex++) {
            const element = gameList[gameListIndex];
            if (selectedGames[gameListIndex]) {
                gamesToBeAdded.push(element._id);
            }
        }
        const data = {
            games: gamesToBeAdded,
            patientId: patientId
        };
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        };
        const response = await client.post('/doctors/assign-games', data, { headers });
        console.log(response.data);
        setSelectedGames([]);
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
                    <View style={styles.instructionText}>
                        <Text style={[globalStyles.titleText]}>Select or Unselect Games</Text>
                    </View>
                    <View>
                        {gameList && gameList.map((game, index) => (
                            <View style={[selectedGames[index] ? styles.GameCardOutside : {}]} key={index}>
                                <Pressable
                                    onPress={() => { handleSelectGame(index) }}
                                >
                                    <Game
                                        title={game.title}
                                        imageUrl={gameImages[game.title]}
                                        description={game.description}
                                        categoryTitle={game.category}
                                        cardStyle={[selectedGames[index] ? styles.GameCardInside : {}]}
                                    />
                                </Pressable>
                            </View>
                        ))}
                    </View>
                    <Pressable
                        onPress={handleSubmit}
                        style={[styles.btn, { marginTop: 20 }]}>
                        <Text style={styles.btnText}>Add Games</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default AssignGameModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    content: {
        backgroundColor: '#f4f1f4',
        borderRadius: 10,
        elevation: 5,
        width: '95%',
        padding: 10,
    },
    GameCardOutside: {
        // backgroundColor: 'red'
    },
    GameCardInside: {
        backgroundColor: 'rgba(134, 65, 244, 0.5)'
    },
    instructionText: {
        // paddingHorizontal: 8,
        paddingVertical: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: '#9c4dcc',
        padding: 10,
        height: 45,
        alignSelf: 'center',
        borderRadius: 5,
        width: '80%',
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
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    picker: {
        height: 50,
        width: 150,
        backgroundColor: 'rgba(134, 65, 244, 1)'
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