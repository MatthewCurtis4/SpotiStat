import React, { Component } from 'react';
import '../App.css';
import { Switch, Route, Link , Redirect} from 'react-router-dom';
import Features from '../components/HomePage/Features';
import SearchOptions from '../components/HomePage/SearchOptions';
import LoginPrompt from '../components/HomePage/LoginPrompt';




/* eslint-disable */

import 'bootstrap/dist/css/bootstrap.min.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

const spotifyApi = new SpotifyWebApi();
const login = process.env.REACT_APP_PORT_BE || 'http://localhost:8888/login';


export class InfoPage extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    //set the tokens globally to be used by other screens
    if (params.access_token) {
      spotifyApi.setAccessToken(params.access_token);
        // Store tokens in a global variable or another storage mechanism
        window.accessToken = params.access_token;
  }
    this.state = {
      loggedIn: window.accessToken ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }

    }
    this.artiststate = {
      loggedIn: window.accessToken ? true : false,
    }
    this.list = [];
  }
  
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              songName: response.item.artists[0].name,
              image: response.item.album.images[0].url
            }
        });
        var cSong = this.state.nowPlaying.name;
        var cArtist = this.state.nowPlaying.songName;
        document.getElementById('PlayingNamesong').innerHTML = cSong ;
        document.getElementById('PlayingNameartist').innerHTML = cArtist ;})      


      }

testTopArtists(T_range){
  spotifyApi.getMyTopArtists({limit:50, time_range:T_range}).then(
    function (data) { 
      var tools = require('../components/getTop.js');
      //got top from getArtist.js
      var value = tools.top(data, "artists");

      document.getElementById('TopArtists').innerHTML = value ;
      /* TopArtists or whatever is in there is just calling the section that is below on output section
      line above is what prints out the results very important*/

    });
}

testTopTracks(T_range){
  spotifyApi.getMyTopTracks({limit:50, time_range:T_range}).then(
    function (data) { 
        var tools = require('../components/getTop.js');
        var value = tools.top(data, "songs");

      document.getElementById('TopSongs').innerHTML = value ;
});
}

  render() {
        //if they are no longer logged in, redirect them to the home page where they will be properly prompted
        if (!this.state.loggedIn) {
            window.location.href = '/';
            return null; // Render nothing, as the page will be redirected
          }
    return (
      <div class = "container">

    <div class="navbar">
        <div class="container flex">
            
            <h1 class="logo">
                <li><Link to="/InfoPage" title="navTitle">SpotiStat<FontAwesomeIcon icon={faSpotify}></FontAwesomeIcon>
                </Link></li>
            </h1>
            <nav>
                <ul>
                    <li><Link to="/ArtistsPage">Top Artists</Link></li>
                    <li><Link to="/SongsPage">Top Songs</Link></li>
                    <li><Link to="/RecentPage">Recently Played</Link></li>

                </ul>
            </nav>
        </div>
    </div>

    <div class="container-wrapper">
        <div className='square-box'>
          <h3 class="header-title"><b>Welcome to SpotiStat</b></h3>
          <h4 class= "sub-header"><b>What Would You Like To View Today?</b></h4>
          <SearchOptions />
          </div>
        {/* {this.state.loggedIn ? (
            //if they are logged in
          <div className='square-box'>
          <h3 class="header-title"><b>Welcome to SpotiStat</b></h3>
          <h4 class= "sub-header"><b>What Would You Like To View Today?</b></h4>
          <SearchOptions />
          </div>
        ) : (
          // If not logged in, go to login page
          <div>
            <div className='square-box'>
            <h3 class="header-title"><b>Welcome to SpotiStat</b></h3>
            <h4 class= "sub-header"><b>Login below to view all your spotify listening stats!</b></h4>
            <LoginPrompt />
            </div>
          </div>
        )} */}
    </div>

    <h3 class="header-title"><b>What Do We Offer at SpotiStat?</b></h3>

    <Features />















    <h3 class="header-title"><b>Want To See Your Top Streamed Artists?</b></h3>
  <h4 class= "sub-header"><b>Select a Time Range</b></h4>
    <ul className="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              data-mdb-tab-init
              className={`nav-link ${this.state.activeTab === 'short_term' ? 'active' : ''}`}
              id="ex1-tab-1"
              href="#ex1-tabs-1"
              role="tab"
              aria-controls="ex1-tabs-1"
              aria-selected={this.state.activeTab === 'short_term'}
              onClick={() => this.testTopArtists('short_term')}
            >
              Past Month
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              data-mdb-tab-init
              className={`nav-link ${this.state.activeTab === 'medium_term' ? 'active' : ''}`}
              id="ex1-tab-2"
              href="#ex1-tabs-2"
              role="tab"
              aria-controls="ex1-tabs-2"
              aria-selected={this.state.activeTab === 'medium_term'}
              onClick={() => this.testTopArtists('medium_term')}
            >
              Past 6 Months
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              data-mdb-tab-init
              className={`nav-link ${this.state.activeTab === 'long_term' ? 'active' : ''}`}
              id="ex1-tab-3"
              href="#ex1-tabs-3"
              role="tab"
              aria-controls="ex1-tabs-3"
              aria-selected={this.state.activeTab === 'long_term'}
              onClick={() => this.testTopArtists('long_term')}
            >
              All Time
            </a>
          </li>
    </ul>

<div id="TopArtists"></div>




<h3 class="header-title"><b>Want To See Your Top Streamed Songs?</b></h3>
  <h4 class= "sub-header"><b>Select a Time Range</b></h4>

  <ul className="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              data-mdb-tab-init
              className={`nav-link ${this.state.activeTab === 'short_term' ? 'active' : ''}`}
              id="ex1-tab-1"
              href="#ex1-tabs-1"
              role="tab"
              aria-controls="ex1-tabs-1"
              aria-selected={this.state.activeTab === 'short_term'}
              onClick={() => this.testTopTracks("short_term")}
            >
              Past Month
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              data-mdb-tab-init
              className={`nav-link ${this.state.activeTab === 'medium_term' ? 'active' : ''}`}
              id="ex1-tab-2"
              href="#ex1-tabs-2"
              role="tab"
              aria-controls="ex1-tabs-2"
              aria-selected={this.state.activeTab === 'medium_term'}
              onClick={() => this.testTopTracks('medium_term')}
            >
              Past 6 Months
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              data-mdb-tab-init
              className={`nav-link ${this.state.activeTab === 'long_term' ? 'active' : ''}`}
              id="ex1-tab-3"
              href="#ex1-tabs-3"
              role="tab"
              aria-controls="ex1-tabs-3"
              aria-selected={this.state.activeTab === 'long_term'}
              onClick={() => this.testTopTracks('long_term')}
            >
              All Time
            </a>
          </li>
    </ul>



      <div id="TopSongs"></div>

        <div>
          <img src={this.state.nowPlaying.image} style={{ height: 150 }}/>
        </div> 




{/* 
        <div id="PlayingNamesong"></div>
        
        <div id="PlayingNameartist"></div>

        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
         */}
      </div>

      )
          }
        }
  
export default InfoPage;