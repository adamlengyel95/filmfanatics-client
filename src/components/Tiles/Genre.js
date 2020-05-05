import React, { Component } from 'react'
import classes from './Genre.module.css'
import { withRouter } from 'react-router-dom';

class Genre extends Component {
    goToMoviesPage = () => {
        this.props.history.push({
            pathname: '/movies',
            state: { genreId: this.props.id }
          })
    }
    render() {
        return (
            <div className={classes.GenreTile} onClick={this.goToMoviesPage} >
                <p className={classes.GenreTitle}>{this.props.title}</p>
            </div>
        )
    }
}

export default withRouter(Genre);
