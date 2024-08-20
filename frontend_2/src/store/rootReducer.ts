import { combineReducers } from 'redux';

import authTokenSlice from './authToken-slice';
import gameCategoriesSlice from './gameCategories-slice';
import gamesSlice from './game-slice';

export const rootReducer = combineReducers({
    authToken: authTokenSlice.reducer,
    gameCategories: gameCategoriesSlice.reducer,
    games: gamesSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
