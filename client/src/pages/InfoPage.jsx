import React, { Component } from 'react';
import '../App.css';
import { Switch, Route, Link } from 'react-router-dom';




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
                </ul>
            </nav>
        </div>
    </div>

    <h3><b>Want To See Your Top Streamed Artists?</b></h3>
  <h4><b>Select a Time Range</b></h4>
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




      <h3><b>Want To See Your Top Streamed Songs?</b></h3>
  <h4><b>Select a Time Range</b></h4>

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

        {/* Render the content based on the activeTab state */}
        <div className="tab-content" id="ex1-content">
          <div
            className={`tab-pane fade ${this.state.activeTab === 'short_term' ? 'show active' : ''}`}
            id="ex1-tabs-1"
            role="tabpanel"
            aria-labelledby="ex1-tab-1"
          >
            {/* Content for Past Month */}
            Tab 1 content
          </div>
          <div
            className={`tab-pane fade ${this.state.activeTab === 'medium_term' ? 'show active' : ''}`}
            id="ex1-tabs-2"
            role="tabpanel"
            aria-labelledby="ex1-tab-2"
          >
            {/* Content for Past 6 Months */}
            Tab 2 content
          </div>
          <div
            className={`tab-pane fade ${this.state.activeTab === 'long_term' ? 'show active' : ''}`}
            id="ex1-tabs-3"
            role="tabpanel"
            aria-labelledby="ex1-tab-3"
          >
            {/* Content for All Time */}
            Tab 3 content
          </div>
        </div>

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