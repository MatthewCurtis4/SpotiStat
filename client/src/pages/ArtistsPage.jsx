import React, { Component } from 'react';
import '../App.css';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { Tab, initMDB } from 'mdb-ui-kit';



/* eslint-disable */

import 'bootstrap/dist/css/bootstrap.min.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

const spotifyApi = new SpotifyWebApi();


export class ArtistsPage extends Component {
  constructor(){
    super();
    // Access the global variable and set it in the Spotify API instance
    if (window.accessToken) {
      spotifyApi.setAccessToken(window.accessToken);
    }

    this.state = {
      loggedIn: window.accessToken ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      activeTab: 'short_term', // Set the initial active tab to 'short_term' because that is what will be shown when you open page first

    };

    this.artiststate = {
      loggedIn: window.accessToken ? true : false,
    };
    this.list = [];
  }
  
    //this is where i initalize the tab as this month on page load
    componentDidMount() {
      // Initialization for ES Users
      initMDB({ Tab });
  
      // Trigger the initial tab content based on the default state
      this.testTopArtists('short_term');
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
  
export default ArtistsPage;