import React, { Component } from 'react';
import GetInfo from '../components/GetInfo';
import '../App.css'


export class InfoPage extends Component {

    render() {
        return (
            <div class="MainPage-bkg" >
                <GetInfo /> 
            </div>
        )
    }
}


export default InfoPage