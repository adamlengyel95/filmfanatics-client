import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store'
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import MovieDetails from './components/Movie/MovieDetails';
import Cards from './components/Cards/Cards';
import Genres from './components/Tiles/Genres';
import ArtistDetails from './components/Artists/ArtistDetails';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Layout} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/movie/:id" component={MovieDetails} />
            <Route path="/actors" component={Cards} />
            <Route path="/directors" component={Cards} />
            <Route path="/movies" component={Cards} />
            <Route path="/genres" component={Genres} />
            <Route path="/decades" component={Genres} />
            <Route path="/artists/:id" component={ArtistDetails} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
