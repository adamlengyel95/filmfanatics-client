import React, { Component } from 'react'
import classes from './MovieListItem.module.css'
import Rating from '@material-ui/lab/Rating';
import { withRouter } from 'react-router-dom';

class MovieListItem extends Component {
    goToMovieDetailsPage = (movieId) => {
        this.props.history.push(`/movie/${movieId}`)
    }   
    render() {
        const ratingCount = this.props.showRatingCount ? <p className={classes.RatingCount}>({this.props.ratingCount})</p> : null;
        return (
            <div key={this.props.id} className={classes.MovieContainer} onClick={() => this.goToMovieDetailsPage(this.props.id)}>
                <div className={classes.moveCoverContainer}>
                    <img className={classes.MovieCover} src={`../../../images/covers/${this.props.imageName}`} alt="cover" />
                </div>
                <div className={classes.MovieInfo}>
                    <p className={classes.MovieTitle}>{this.props.title} ({new Date(this.props.releaseDate).getFullYear()})</p>
                    <Rating
                        name="movieRating"
                        className={classes.Rating}
                        value={this.props.rating == null ? 0 : this.props.rating}
                        precision={0.5}
                        readOnly
                        onChange={(event, value) => this.onRatingChange(value)} />
                    {ratingCount}
                    <p className={classes.DirectorLabel}><span className={classes.ArtistInfoTitle}>Rendezte:</span> {this.props.directors}</p>

                </div>
            </div>
        )
    }
}

export default withRouter(MovieListItem)