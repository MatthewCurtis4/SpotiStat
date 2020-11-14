import React, { Component } from 'react';
import '../App.css';


/* eslint-disable */

import 'bootstrap/dist/css/bootstrap.min.css';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();


export class GetInfo extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    if (params.access_token) {
      spotifyApi.setAccessToken(params.access_token);
  }
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }

    }
    this.artiststate = {
      loggedIn: params.access_token ? true : false,
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
  Getplaylists(){
    spotifyApi
      .getUserPlaylists()
      .then((response) => {
        this.setState({
          Playlists: { 
              name : response.items[0].name
            }
          });
        })
    }





  getTopTracks(){
    spotifyApi.getMyTopTracks()
    .then((response) => {
      this.setState({
        TopSongs: { 
          name: response.items[0].album.name, 
          popularity: response.items[0].popularity
        }
      });
    })
  }



testTopArtists(T_range){
  spotifyApi.getMyTopArtists({limit:50, time_range:T_range}).then(
    function (data) { 
      var tools = require('./getTop.js');
      //got top from getArtist.js
      var value = tools.top(data);

      document.getElementById('TopArtists').innerHTML = value ;
      /* TopArtists or whatever is in there is just calling the section that is below on output section
      line above is what prints out the results very important*/

    });
}

testTopTracks(T_range){
  spotifyApi.getMyTopTracks({limit:50, time_range:T_range}).then(
    function (data) { 
      var tools = require('./getTop.js');
      var value = tools.top(data);

      document.getElementById('TopSongs').innerHTML = value ;
});
}

  render() {
    return (
        
<div className="App">


<h1><b>Welcome to SpotiStat</b></h1>
  

  <h3><b>Want To See Your Top Streamed Artists?</b></h3>
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

        <div id="PlayingNamesong"></div>
        
        <div id="PlayingNameartist"></div>

        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
        
      </div>
      )
          }
        }
  
export default GetInfo;