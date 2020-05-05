import React, { Component } from 'react'
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';

import Navbar from '../Navigation/Navbar/Navbar'
import MovieListItem from '../Movie/MovieListItem'
import classes from './ArtistDetails.module.css'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class ArtistDetails extends Component {

    state = {
        artistDetails: {
            name: '',
            imageName: '',
            movies: []
        },
        showForbiddenMessage: false
    }

    componentWillMount() {
        this.fetchArtistDetails();
    }

    fetchArtistDetails = () => {
        axios.get(`/artists/${this.props.match.params.id}`)
            .then((res) => {
                this.setState({ artistDetails: res.data })
            }).catch((err) => console.error('Error occured during fetching artist details', err))
    }

    goToMovieDetailsPage = (movieId) => {
        this.props.history.push(`/movie/${movieId}`)
    }

    onFollowClicked = () => {
        axios.post('/artists/follow', null, {
            params: {
                artistId: this.state.artistDetails.id
            }
        }).then(() => {
            this.fetchArtistDetails();
        }).catch((err) => {
            if (err.response && err.response.status === 403) {
                this.setState({ snackbarMessage: 'Az értékeléshez be kell jelentkeznie' })
                this.setState({ showForbiddenMessage: true })
            } else {
                this.setState({ snackbarMessage: 'Hiba történt a követés közben' })
                this.setState({ showErrorMessage: true })
            }
        })
    }

    onStopFollowClicked = () => {
        axios.delete('/artists/follow', {
            params: {
                artistId: this.state.artistDetails.id
            }
        }).then(() => {
            this.fetchArtistDetails()
        })
    }

    handleForbiddenClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ showForbiddenMessage: false });
    };

    handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ showErrorMessage: false });
    };

    render() {
        const followButton = this.state.artistDetails.isFollowed ?
            <button className={`${classes.FollowButton} ${classes.StopFollow}`} onClick={this.onStopFollowClicked}>Követés leállítása</button> :
            <button className={classes.FollowButton} onClick={this.onFollowClicked}>Követés</button>
        return (
            <>
                <Navbar />
                <div className={classes.ArtistDetailsContainer}>
                    <div className={classes.ArtistDetailsHeader}>
                        <div>
                            <img src={'../../../images/artist-pictures/' + this.state.artistDetails.imageName} className={classes.ProfilePicture} alt="cover" />
                        </div>
                        <div className={classes.ArtistInfo}>
                            <h4 className={classes.ActorName}>{this.state.artistDetails.name}</h4>
                            <p><span className={classes.ArtistInfoTitle}>Született:</span> {new Date(this.state.artistDetails.birthDate).toLocaleDateString()}</p>
                            <p><span className={classes.ArtistInfoTitle}>Születési hely:</span> {this.state.artistDetails.birthPlace}</p>
                            <p><span className={classes.ArtistInfoTitle}>Magasság:</span> {this.state.artistDetails.height} cm</p>
                            {followButton}
                        </div>
                    </div>
                    <div>
                        <h4 className={classes.MoviesLabel}>Filmek</h4>
                        <div className={classes.Comments}>
                            {
                                this.state.artistDetails.movies.map(movie => {
                                    return <MovieListItem
                                        key={movie.id}
                                        id={movie.id}
                                        imageName={movie.imageName}
                                        title={movie.title}
                                        releaseDate={movie.releaseDate}
                                        rating={movie.rating}
                                        ratingCount={movie.ratingCount}
                                        directors={movie.directors}
                                        showRatingCount={true}
                                    />
                                })
                            }
                        </div>
                    </div>
                </div>
                <Snackbar open={this.state.showForbiddenMessage} autoHideDuration={6000} onClose={this.handleForbiddenClose}>
                    <Alert onClose={this.handleForbiddenClose} severity="info">
                        {this.state.snackbarMessage}
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.showErrorMessage} autoHideDuration={6000} onClose={this.handleErrorClose}>
                    <Alert onClose={this.handleErrorClose} severity="error">
                        {this.state.snackbarMessage}
                    </Alert>
                </Snackbar>
            </>
        )
    }
}

export default withRouter(ArtistDetails);
