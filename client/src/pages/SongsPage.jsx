import React, { Component } from 'react';
import '../App.css';
import { Switch, Route, Link } from 'react-router-dom';



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
        };
    
        this.artiststate = {
          loggedIn: window.accessToken ? true : false,
        };
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
          <div>
    
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
    
    
    
                    <h3><b>Want To See Your Top Streamed Songs?</b></h3>
  <h4><b>Select a Time Range</b></h4>
  <div className="row">
          <div className="col">
          { this.state.loggedIn &&
    <button onClick={() => this.testTopTracks("short_term")}>
      Past Month
    </button>}
          </div>
          <div className="col">
          { this.state.loggedIn &&
    <button onClick={() => this.testTopTracks("medium_term")}>
      Past 6 Months
    </button>}
          </div>
          <div className="col">
          { this.state.loggedIn &&
    <button onClick={() => this.testTopTracks("long_term")}>
      All Time
    </button>}
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
      

  
export default SongsPage;