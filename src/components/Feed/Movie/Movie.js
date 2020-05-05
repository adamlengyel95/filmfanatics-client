
import React, { Component } from 'react';
import classes from './Movie.module.css';
import { withRouter } from 'react-router-dom';

export class Movie extends Component {
    goToDetailedPage = () => {
        this.props.history.push(`/movie/${this.props.id}`)
    }
    render() {
        const imgSrc = `images/covers/${this.props.cover}`
        return (
            <div className={classes.MovieBox}>
                <h2 className={classes.MovieTitle} onClick={this.goToDetailedPage}>{this.props.title} ({new Date(this.props.release).getFullYear()})</h2>
                <img src={imgSrc} className={classes.MovieCover} alt="cover" />
                <h4 className={classes.DescriptionTitle}>Leírás</h4>
                <div className={classes.Description}>{this.props.description}</div>
            </div>
        );
    }
}

export default withRouter(Movie);