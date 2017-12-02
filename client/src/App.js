import React, { Component } from 'react';
// import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  // Link
} from 'react-router-dom'
// import { createStore } from 'redux';

import { connect } from 'react-redux'; 
import * as actions from './actions';

///////////////////////////////
////// Component Imports //////
///////////////////////////////

import Navbar from './Components/Navbar'
import BandProfile from './Components/BandProfile';
import UserProfile from './Components/User/UserProfile';
import UserDashboard from './Components/User/UserDashboard';
import BandDashboard from './Components/Band/BandDashboard';
import LandingPage from './Components/LandingPage';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  
  componentDidMount(){
    this.props.fetchUser();
    this.props.fetchEvents();
  }

  render() {
    return (
      <Router>
      <div>

          <Route exact path="/" render={() => <div><LandingPage /></div>} />

          <Route exact path="/user" render={() => <div><Navbar /><UserDashboard /></div>} />
          <Route exact path="/userprofile" render={() => <div><Navbar /><UserProfile /></div>} />
          <Route exact path="/myshows" render={() => <div><Navbar /><div>Placeholder for filtered shows.</div></div>} />

          <Route exact path="/band" render={() => <div><Navbar /><BandDashboard /></div>} />
          <Route exact path="/bandprofile" render={() => <div><Navbar /><BandProfile /></div>} />
          <Route exact path="/band/upcoming" render={() => <div><Navbar /><BandDashboard tab="upcoming" /></div>} />
          <Route exact path="/band/finalize" render={() => <div><Navbar /><BandDashboard tab="finalize" /></div>} />
          <Route exact path="/band/potential" render={() => <div><Navbar /><BandDashboard tab="potential" /></div>} />
          <Route exact path="/band/pitch" render={() => <div><Navbar /><BandDashboard tab="pitch" /></div>} />
        </div>
      </Router>
    );
  }
}

export default connect(null, actions)(App);
