import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../api/client';
// import { GameStackParamList } from '../routes/PatientStack';

interface IGame {
    _id: string;
    title: string;
    description: string;
    htmlContent: string;
    cssContent: string;
    javascriptContent: string;
    category: string;
}

export const fetchGames = createAsyncThunk<IGame[], string>(
    'games/fetchGames',
    async (gameCategoryId: string) => {
        try {
            const response = await client.get(`/games/gameCategroy/${gameCategoryId}`);
            console.log('category in function', response.data.games[0].category);
            const games: IGame[] = response.data.games;
            return games;

        } catch (error) {
            return [] as IGame[];
        }
    }
);

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        games: [] as IGame[],
        isLoading: false,
        error: undefined as string | undefined,
    },
    reducers: {
        addGame(state, action: PayloadAction<IGame>) {
            state.games = [...state.games, action.payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log('before', state.games);
                console.log('category', action.payload[0].category);
                if (action.payload && !(state.games.some(game => game['category'] === action.payload[0].category))) {
                    state.games = [...state.games, ...action.payload];
                }
                // console.log('after', state.games);
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default gamesSlice;
