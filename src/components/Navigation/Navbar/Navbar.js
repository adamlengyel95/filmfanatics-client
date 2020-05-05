import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { searchMovies } from '../../../actions/movieActions';
import { fetchActorsByName, fetchDirectorsByName, fetchMoviesByTitle } from '../../../actions/cardActions';
import constants from '../../../constants/constants';
import classes from './Navbar.module.css';

class Navbar extends React.Component {
    state = {
        isAuthenticated: false,
        actualUser: '',
        searchInput: '',
        searchPlaceholder: ''
    }

    componentDidMount() {
        if (window.location.pathname === '/actors') {
            this.setState({ searchPlaceholder: 'Színész keresése...' })
        }
        else if (window.location.pathname === '/directors') {
            this.setState({ searchPlaceholder: 'Rendező keresése...' })
        } else {
            this.setState({ searchPlaceholder: 'Film keresése...' })
        }
        axios.get('/profile')
            .then(res => {
                if (res.data.user_id) {
                    this.setState({ isAuthenticated: true });
                    this.setState({ actualUser: res.data.display_name })
                }
            });
    }

    onSignOutClick = () => {
        axios.get('/auth/logout', { withCredentials: true })
            .then(function (response) {
                window.location.href = constants.BASE_URL;
            })
            .catch(function (error) {
                console.error(error)
            });
    }

    onSearchInputChange = (e) => {
        this.setState({ searchInput: e.target.value })
    }

    goToProfilePage = () => {
        this.props.history.push(`/profile`)
    }

    goToMoviesPage = () => {
        this.props.history.push({
            pathname: '/movies',
            state: { searchInput: this.state.searchInput }
          })
    }

    onSearch = () => {
        if (window.location.pathname === '/') {
            this.props.searchMovies(this.state.searchInput);
        } else if (window.location.pathname === '/actors') {
            this.props.fetchActorsByName(this.state.searchInput);
        } else if (window.location.pathname === '/directors') {
            this.props.fetchDirectorsByName(this.state.searchInput);
        } else if (window.location.pathname === '/movies') {
            this.props.fetchMoviesByTitle(this.state.searchInput);
        } else {
           this.goToMoviesPage();
        }
    }

    enterPressed = (event) => {
        if (event.which === 13) {
            this.onSearch();
        }
    }

    render() {
        if (!this.state.isAuthenticated) {

            return (
                <div className={classes.Navbar}>
                    <div className={classes.Logo}>
                        <a href={constants.BASE_URL}>Film Fanatics</a>
                    </div>
                    <div className={classes.Search_container}>
                        <input
                            type="text"
                            value={this.state.searchInput}
                            onChange={this.onSearchInputChange}
                            onKeyPress={this.enterPressed}
                            placeholder={this.state.searchPlaceholder}>
                        </input>
                        <button type="submit" onClick={this.onSearch}>Keresés</button>
                        <div className={classes.autoCompleteList}></div>
                    </div>
                    <Link to="/login" className={classes.Login_button}>Bejelentkezés</Link>
                </div>
            );
        }
        else if (this.state.isAuthenticated) {
            return (
                <>
                    <div className={classes.Navbar}>
                        <div className={classes.Logo}>
                            <Link to="/">Film Fanatics</Link>
                        </div>
                        <div className={classes.Search_container}>
                            <input
                                type="text"
                                value={this.state.searchInput}
                                onChange={this.onSearchInputChange}
                                onKeyPress={this.enterPressed}
                                placeholder={this.state.searchPlaceholder}>
                            </input>
                            <button type="submit">Keresés</button>
                        </div>
                        <p className={classes.Login_button} onClick={this.goToProfilePage}>{this.state.actualUser.split(' ')[0]}</p>
                        <p className={classes.Logout_button} onClick={this.onSignOutClick}>Kijelentkezés</p>
                    </div>
                </>
            );
        } else {
            return null;
        }
    }

};

export default withRouter(connect(null, { searchMovies, fetchActorsByName, fetchDirectorsByName, fetchMoviesByTitle })(Navbar));