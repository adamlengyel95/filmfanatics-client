import React, { Component } from 'react'

import styles from './Login.module.css';
import logo from './images/sign-in-logo.png';

export class Login extends Component {
  render() {
    return (
      <div className={styles.LoginContainer}>
        <h2 className={styles.LoginTitle}>Bejelentkezés</h2>
        <img className={styles.Logo} src={logo} alt="sign in logo" />
        <div className={styles.ButtonContainer}>
            <a className={styles.LoginButton} href="https://filmfanatics-api.herokuapp.com/auth/google">Bejelentkezés Google+ fiókkal</a>
        </div>
      </div>
    )
  }
}

export default Login
