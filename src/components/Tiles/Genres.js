import React, { Component } from 'react'
import Navbar from '../Navigation/Navbar/Navbar';
import axios from 'axios';
import classes from './Genres.module.css';
import Genre from './Genre'
import Decade from './Decade'

export default class Genres extends Component {
    state = {
        genres: [],
        decades: [
            {
                title: '80-as évek',
                fromDate: '1980/01/01',
                toDate: '1990/01/01'
            },
            {
                title: '90-es évek',
                fromDate: '1990/01/01',
                toDate: '2000/01/01'
            },
            {
                title: '00-es évek',
                fromDate: '2000/01/01',
                toDate: '2010/01/01'
            },
            {
                title: '10-es évek',
                fromDate: '2010/01/01',
                toDate: '2020/01/01'
            },
        ]
    }
    componentDidMount() {
        axios.get(`/movies/genres`)
            .then((res) => {
                this.setState({ genres: res.data })
            }).catch((err) => console.error('Error occured during fetching genres', err))
    }

    render() {
        const currentTiles = this.props.location.pathname === '/genres' ?
            <div className={classes.GenreContainer}>
                {
                    this.state.genres.map((genre) => {
                        return <Genre key={genre.id} id={genre.id} title={genre.name} />
                    })
                }
            </div> :
            <div className={classes.GenreContainer}>
                {
                    this.state.decades.map((decade, index) => {
                        return <Decade key={index} fromDate={decade.fromDate} toDate={decade.toDate} title={decade.title} />
                    })
                }
            </div>
        return (
            <>
                <Navbar />
                {currentTiles}
            </>
        )
    }
}
