import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Main from './pages/Main';
import InfoPage from './pages/InfoPage';
import ArtistsPage from './pages/ArtistsPage.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'


  function App() {
    return (
        <BrowserRouter>
        <Route exact path='/' component={Main}/>
        <Route path='/InfoPage' component={InfoPage}/>
        <Route path='/ArtistsPage' component={ArtistsPage} />
      </BrowserRouter>

//       <div class="body" >
//       <div class="container">
//       <div class="navbar">
//           <div class="container flex">
//               <h1 class="logo">
              
//               <Link to="/">SpotiStat <FontAwesomeIcon icon={faSpotify} /></Link>
//               </h1>
//               <nav>
//                   <ul>
//                       <li><Link to="/ArtistsPage">Top Artists</Link></li>
//                       <li><a href="ArtistsPage.jsx">Top </a></li>
//                       <li><a href="songsPage.html">Top Songs</a></li>

//                   </ul>
//               </nav>
//           </div>
//       </div>
//       </div>
//   </div>



      )
    }
  
export default App;