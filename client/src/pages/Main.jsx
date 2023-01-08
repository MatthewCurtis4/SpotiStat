import React, { Component } from 'react'
import '../App.css'
//const login = process.env.REACT_APP_PORT_BE || 'https://shielded-forest-06718.herokuapp.com/login';
//const login = process.env.REACT_APP_PORT_BE || 'https://spoti-stat-login.vercel.app/login';
//const login = process.env.REACT_APP_PORT_BE || 'http://matthewcurtis4.github.io/SpotiStat/express/login';
const login = process.env.REACT_APP_PORT_BE || 'http://localhost:8888/login';


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