import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import {
    Button,
    Dialog,
} from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { GameStackParamList } from '../../../routes/PatientStack';
import { useLogin } from '../../../context/LoginProvider';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchGames } from '../../../store/game-slice';
import { GameStackParamList } from '../../../routes/PatientStack';
import Game from '../../../components/Game';
import client from '../../../api/client';
// import { Balloons } from 'react-native-fiesta';
interface Category {
    __v: number;
    _id: string;
    description: string;
    title: string;
}
// type GameScreenProps = NativeStackScreenProps<GameStackParamList, 'Slot'>;
type GameCategoryScreenProps = NativeStackScreenProps<GameStackParamList, 'Category'>;

const GameCategory = ({ route, navigation }: GameCategoryScreenProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const games = useSelector((state: RootState) => state.games.games);
    const categoryId = route.params._id;
    const [categoryGames, setCategoryGames] = useState<typeof games>([]);
    const [categories, setCategories] = useState<Category[]>([]);


    const getAllCategories = async () => {
        try {
            const response = await client.get('/games/game-categories');
            const data = await response.data.gameCategories;  // Assuming the API response structure
            setCategories(data);

        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        // console.log('categoryId', categoryId);
        // console.log('games', games);
        dispatch(fetchGames(categoryId));
    }, []);

    useEffect(() => {
        const filtered = games.filter(game => {
            // console.log('game._id', game.category);
            // console.log('categoryId', categoryId);
            return game.category === categoryId;
        });
        setCategoryGames(filtered);
        getAllCategories();
    }, [games]);



    useEffect(() => {
        // console.log('categoryGames', categoryGames);
    }, [categoryGames]);

    const gameImages: { [key: string]: any } = {
        'Crossy Road': require('../../../../assets/games/cross.png'),
        'Tic Tac Toe': require('../../../../assets/games/tic-tac-toe.png'),
        'Flip Card': require('../../../../assets/games/flipcard.jpg')
    };

    // const [dialogVisible, setDialogVisible] = useState(false);
    // const [pointEarned, setpointEarned] = useState(false);
    // const { updateUserPoints } = useLogin();

    // const handleMessage = (event: any) => {
    //     const data = JSON.parse(event.nativeEvent.data);
    //     console.log(data);
    //     if (data.type) {
    //         setDialogVisible(true);
    //         setpointEarned(data.points);
    //         updateUserPoints(data.points, 'Puzzle');
    //     }
    // };

    // const navigateBack = () => {
    //     // Close the dialog and navigate back
    //     setDialogVisible(false);
    //     navigation.goBack(); // Or use the specific navigation action you need
    // };

    return (
        <ScrollView>
            {
                categoryGames && categoryGames.map((card) => {
                    const category = categories.find(c => c._id === card.category);
                    const categoryTitle = category ? category.title : 'Unknown';

                    return (
                        <TouchableOpacity key={card._id} onPress={() => {
                            // Prepare the data you want to pass without mutating the original data.
                            navigation.navigate('GameItem', { _id: card._id, category: categoryTitle });
                        }}>
                            <Game
                                title={card.title}
                                description={card.description}
                                imageUrl={gameImages[card.title]}
                                categoryTitle={categoryTitle}  // Now using the variable correctly scoped
                            />
                        </TouchableOpacity>
                    );
                })
            }

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    dialogueTitle: {
        color: 'black',
        marginBottom: 0
    },
    dialogueText: {
        color: 'black',
        marginBottom: 16
    },
    container: {
        flex: 1,
    },
});

export default GameCategory;
