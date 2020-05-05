import React, { Component } from 'react'
import classes from './Genre.module.css'
import { withRouter } from 'react-router-dom';

class Decade extends Component {
    goToMoviesPage = () => {
        this.props.history.push({
            pathname: '/movies',
            state: { decade: {fromDate: this.props.fromDate, toDate: this.props.toDate} }
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

export default withRouter(Decade);
