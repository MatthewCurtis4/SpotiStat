import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Main from './pages/Main';
import InfoPage from './pages/InfoPage';
import ArtistsPage from './pages/ArtistsPage.jsx';
import SongsPage from './pages/SongsPage.jsx';
import RecentPage from './pages/RecentPage';



  function App() {
    return (
        <BrowserRouter>
        <Route exact path='/' component={Main}/>
        <Route path='/InfoPage' component={InfoPage}/>
        <Route path='/ArtistsPage' component={ArtistsPage} />
        <Route path='/SongsPage' component={SongsPage} />
        <Route path='/RecentPage' component={RecentPage} />


      </BrowserRouter>



      )
    }
  
export default App;