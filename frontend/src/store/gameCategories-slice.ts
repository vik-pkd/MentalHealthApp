import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../api/client';
// import { GameStackParamList } from '../routes/PatientStack';

interface GameCategory {
  _id: string;
  title: string;
  description: string;
  imageUrl: number;
  imageList: number[];

}
export const fetchGameCategories = createAsyncThunk<GameCategory[], void>(
  'gameCategories/fetchGameCategories',
  async () => {
    const response = await client.get('/games/game-categories');
    const gameCategories: GameCategory[] = response.data.gameCategories;
    return gameCategories;
  }
);

const gameCategoriesSlice = createSlice({
  name: 'gameCategories',
  initialState: {
    gameCategories: [] as GameCategory[],
    isLoading: false,
    error: undefined as string | undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGameCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('action in categories', action.payload);
        state.gameCategories = action.payload;
      })
      .addCase(fetchGameCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default gameCategoriesSlice;
