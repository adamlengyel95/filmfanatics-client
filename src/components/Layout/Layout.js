import React, { Component } from 'react';
import Navbar from '../Navigation/Navbar/Navbar';
import Movies from '../Feed/Movies/Movies';
import SideNavigation from '../Navigation/SideNavigation/SideNavigation';
import styles from './Layout.module.css';
import classes from './Layout.module.css';

class Layout extends Component {

    render() {
        return (
            <div className={classes.Page}>
                <Navbar />
                <div className={styles.Content}>
                    <SideNavigation />
                    <Movies />
                    <div className={styles.Empty} />
                </div>
            </div>
        );
    }
}

export default Layout;