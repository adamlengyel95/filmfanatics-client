import React, { Component } from 'react'
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import Navbar from '../Navigation/Navbar/Navbar';
import MovieListItem from '../Movie/MovieListItem'
import classes from './Profile.module.css';

class Profile extends Component {
    state = {
        user: {},
        triggerRedirect: false,
        ratedMovies: [],
        followedArtists: [],
        pageIsReady: false
    }

    componentDidMount() {
        this.fetchProfileDetails();
    }

    fetchProfileDetails() {
        axios.get('/profile/details')
            .then((res) => {
                this.setState({ followedArtists: res.data.followedArtists })
                this.setState({ ratedMovies: res.data.ratedMovies })
                this.setState({ pageIsReady: true })
            })
            .catch((err) => {
                this.setState({ triggerRedirect: true })
            });
    }

    goToArtistPage = (artistId) => {
        this.props.history.push(`/artists/${artistId}`);
    }

    onStopFollowClicked = (artistId) => {
        axios.delete('/artists/follow', {
            params: {
                artistId: artistId
            }
        }).then(() => {
            this.fetchProfileDetails()
        })
    }

    render() {
        if (this.state.triggerRedirect) {
            return <Redirect from="*" to={{ pathname: '/login' }} />;
        } else if (!this.state.pageIsReady) {
            return null;
        } else {
            const ratedMoviesContent = this.state.ratedMovies.length === 0 ? <h4 className={classes.NoContentTitle}>(Még egy filmet sem értékelt)</h4> :
                this.state.ratedMovies.map((movie) => {
                    return <MovieListItem
                        id={movie.id}
                        imageName={movie.imageName}
                        title={movie.title}
                        releaseDate={movie.releaseDate}
                        rating={movie.rating}
                        ratingCount={movie.ratingCount}
                        directors={movie.directors}
                        showRatingCount={false}
                    />
                });
            const followedArtistsContent = this.state.followedArtists.length === 0 ? <h4 className={classes.NoContentTitle}>(Jelenleg egy színészt/rendezőt sem követ)</h4> :
                this.state.followedArtists.map((artist) => {
                    return <div className={classes.ArtistContainer}>
                        <div className={classes.ArtistImageContainer}>
                            <img src={`../../../images/artist-pictures/${artist.imageName}`} className={classes.ArtistImage} alt="profile"></img>
                        </div>
                        <div className={classes.ActorInfo}>
                            <h4 className={classes.ArtistName} onClick={() => this.goToArtistPage(artist.id)}>{artist.name}</h4>
                            <p className={classes.StopFollowButton} onClick={() => this.onStopFollowClicked(artist.id)}>Követés leállítása</p>
                        </div>
                    </div>
                });
            return (
                <>
                    <Navbar />
                    <div className={classes.ProfileDetailsContainer}>
                        <div className={classes.RatedMoviesContainer}>
                            <h4 className={classes.MainTitle}>Értékelt filmek</h4>
                            {ratedMoviesContent}
                        </div>
                        <div className={classes.FollowedArtistsContainer}>
                            <h4 className={classes.MainTitle}>Követések</h4>
                            {followedArtistsContent}
                        </div>

                    </div>
                </>
            );
        }
    }
}

export default withRouter(Profile);
