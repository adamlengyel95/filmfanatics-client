import { FETCH_MOVIES, SEARCH_MOVIES } from './types';
import axios from 'axios';

export const fetchMovies = () => dispatch => {
    axios.get('http://filmfanatics-api.rabit.hu/movies/home', {withCredentials: true})
        .then(res => {
            const movies = res.data;
            dispatch({
                type: FETCH_MOVIES,
                payload: movies
            })
        });
}

export const searchMovies = title => dispatch => {
    axios.get('http://filmfanatics-api.rabit.hu/movies/search-home', {
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