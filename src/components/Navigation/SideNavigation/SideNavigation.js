import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import styles from './SideNavigation.module.css'

class SideNavigation extends Component {

  goToPage = (path) => {
    this.props.history.push(path)
  }

  render() {
    return (
      <div className={styles.SideNavigation}>
        <ul>
          <li className={styles.SideNavItem} onClick={() => this.goToPage('/actors')}>
            <p className={styles.SideNavLink}>Színészek/Színésznők</p>
          </li>
          <li className={styles.SideNavItem} onClick={() => this.goToPage('/genres')}>
            <p className={styles.SideNavLink}>Műfajok</p>
          </li>
          <li className={styles.SideNavItem} onClick={() => this.goToPage('/decades')}>
            <p className={styles.SideNavLink}>Korszakok</p>
          </li>
          <li className={styles.SideNavItem} onClick={() => this.goToPage('/movies')}>
            <p className={styles.SideNavLink}>Filmek</p>
          </li>
          <li className={styles.SideNavItem} onClick={() => this.goToPage('/directors')}>
            <p className={styles.SideNavLink}>Rendezők</p>
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(SideNavigation);
