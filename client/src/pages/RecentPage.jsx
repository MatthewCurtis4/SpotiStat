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
    
        this.testRecentlyPlayed();


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
    

    
    
      testRecentlyPlayed(){
            spotifyApi.getMyRecentlyPlayedTracks().then(
                function(data) {
                    var tools = require('../components/getRecent.js');
                    var value = tools.recent(data);
            
                document.getElementById('RecentlyPlayed').innerHTML = value ;
                }
            );
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

            <div id="title-container">
                <h4 class="subtitle">Song Title</h4>
                <h4 class="subtitle">Artist Name</h4>
                <h4 class="subtitle">Time Played</h4>
            </div> 
            <div id="center-container">
                <div id="RecentlyPlayed"></div>
            </div>

          </div>
    
          )
              }
            }
      

  
export default SongsPage;