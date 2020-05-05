import { combineReducers } from 'redux';
import movieReducer from './movieReducer'
import cardReducer from './cardReducer';

export default combineReducers({
    movies: movieReducer,
    cards: cardReducer
})