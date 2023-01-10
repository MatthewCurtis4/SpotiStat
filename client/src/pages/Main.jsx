import React, { Component } from 'react'
import '../App.css'
var login = process.env.REACT_APP_PORT_BE || "https://spotistat-login.onrender.com/login";

export class Home extends Component {

    render() {
        return (
                <div class="login-style">

                    <h1 >Welcome to SpotiStat</h1>
                    <h2>Login with Spotify to get started</h2>
                    <a class="button-login" href={login} > LOGIN </a>
                </div>
        )
    }
}



export default Home