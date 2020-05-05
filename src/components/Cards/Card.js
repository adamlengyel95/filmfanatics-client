import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import classes from './Card.module.css'

class Card extends Component {

    onCardClick = () => {
        if (window.location.pathname === '/movies') {
            this.props.history.push(`/movie/${this.props.id}`)
        } else {
            this.props.history.push(`/artists/${this.props.id}`,
                { details: { name: this.props.title, imageName: this.props.imageName } })
        }
    }

    render() {
        const imgSrc = window.location.pathname === '/movies' ? `images/covers/${this.props.imageName}` : `images/artist-pictures/${this.props.imageName}`
        return (
            <div className={classes.CardContainer} onClick={this.onCardClick}>
                <img className={classes.CardImage} src={imgSrc} alt="profile picure"></img>
                <p className={classes.Title}>{this.props.title}</p>
            </div>
        )
    }
}

export default withRouter(Card); 