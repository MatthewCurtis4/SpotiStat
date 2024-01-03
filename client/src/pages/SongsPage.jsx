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


export class SongsPage extends Component {
    constructor(){
        super();
        const params = this.getHashParams();
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
        this.testTopTracks('short_term');
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
            window.location.href = '/InfoPage';
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
                                </ul>
                            </nav>
                        </div>
                    </div>
    
    
    
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
{/* 
        <div>
          <img src={this.state.nowPlaying.image} style={{ height: 150 }}/>
        </div>  */}
    
    
    
    
    
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
      

  
export default SongsPage;