import React, { Component } from 'react';
import '../App.css';
import { Switch, Route, Link } from 'react-router-dom';




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
    };

    this.artiststate = {
      loggedIn: window.accessToken ? true : false,
    };
    this.list = [];
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



  <h3><b>Top Artists</b></h3>
  <h4><b>Select a Time Range</b></h4>
  <div className="row">
          <div className="col">
          { this.state.loggedIn &&
    <button onClick={() => this.testTopArtists("short_term")}>
      Past Month
    </button>}
          </div>
          <div className="col">
          { this.state.loggedIn &&
    <button onClick={() => this.testTopArtists("medium_term")}>
      Past 6 Months
    </button>}
          </div>
          <div className="col">
          { this.state.loggedIn &&
    <button onClick={() => this.testTopArtists("long_term")}>
      All Time
    </button>}
          </div>        
      </div>

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