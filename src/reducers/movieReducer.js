import { FETCH_MOVIES, SEARCH_MOVIES } from '../actions/types';

const initialState = {
    homeItems: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_MOVIES:
            return {
                ...state,
                homeItems: action.payload
            }
        case SEARCH_MOVIES:
            return {
                ...state,
                homeItems: action.payload
            }
        default:
            return state;
    }
}