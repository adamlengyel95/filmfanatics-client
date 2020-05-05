import { FETCH_MOVIES, SEARCH_MOVIES } from './types';
import axios from 'axios';

export const fetchMovies = () => dispatch => {
    axios.get('/movies/home')
        .then(res => {
            const movies = res.data;
            dispatch({
                type: FETCH_MOVIES,
                payload: movies
            })
        });
}

export const searchMovies = title => dispatch => {
    axios.get('/movies/search-home', {
        params:
            { title: title }
    }).then(res => {
        const movies = res.data;
        dispatch({
            type: SEARCH_MOVIES,
            payload: movies
        })
    })
}