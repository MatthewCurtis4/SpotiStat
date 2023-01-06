import React, { Component } from 'react'
import '../App.css'
//const login = process.env.REACT_APP_PORT_BE || 'https://shielded-forest-06718.herokuapp.com/login';
const login = process.env.REACT_APP_PORT_BE || 'http://localhost:8888/login';
export class Home extends Component {

    render() {
        return (
                <div class="login-style">

                    <h1>Welcome to SpotiStat</h1>
                    <h2>Login with Spotify to get started</h2>
                    <font size="100px"><a className="button-center" href={login} > LOGIN </a></font>
                </div>
        )
    }
}






export default Home