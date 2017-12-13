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
import ShowDescription from './Components/ShowDescription';
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
    this.props.fetchEvents();
    this.props.checkAttendance()
    this.props.fetchUser()
    this.props.fetchUserProfile()
    this.props.fetchAllUsers()
    this.props.fetchVenues()
  }

  render() {
    // console.log('on app',this.props.events)
    return (
      <Router>
      <div>

          <Route exact path="/" render={() => <div><LandingPage /></div>} />

          <Route exact path="/user" render={() => <div><Navbar /><UserDashboard /></div>} />
          <Route exact path="/userprofile" render={() => <div><Navbar /> <UserProfile /> </div>} />
          <Route path="/showdetails/:showId" component={ShowDescription} />
          <Route path="/bandprofile/:bandId" component={BandProfile} />

          <Route exact path="/band" render={() => <div><Navbar /><BandDashboard /></div>} />

          <Route exact path="/band/upcoming" render={() => <div><Navbar /><BandDashboard tab="upcoming" /></div>} />
          <Route exact path="/band/finalize" render={() => <div><Navbar /><BandDashboard tab="finalize" /></div>} />
          <Route exact path="/band/potential" render={() => <div><Navbar /><BandDashboard tab="potential" /></div>} />
          <Route exact path="/band/pitch" render={() => <div><Navbar /><BandDashboard tab="pitch" /></div>} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ auth, info, users, events }){
  return { 
    auth: auth,
    info: info,
    users: users,
    events,
  }
}

export default connect(mapStateToProps, actions)(App);
