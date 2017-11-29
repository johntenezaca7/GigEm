import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  // Link
} from 'react-router-dom'
import { createStore } from 'redux';


///////////////////////////////
////// Component Imports //////
///////////////////////////////

import Navbar from './Components/Navbar'
import BandProfile from './Components/BandProfile';
import UserDashboard from './Components/User/UserDashboard';
import BandDashboard from './Components/Band/BandDashboard';

// import BandNavTabs from "./Components/Band/BandNavTabs";
// import BandUpcomingGig from './Components/Band/BandUpcomingGig';
// import BandPotentialGig from './Components/Band/BandPotentialGig';
// import BandToFinalize from './Components/Band/BandToFinalize'
// import BandPitch from './Components/Band/BandPitch';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {}
    this.fetchDemo = this.fetchDemo.bind(this);

    this.reducer = (state = 0, action) => {
      switch(action.type) {
        case 'INCREMENT':
          return state + 1;
        case 'DECREMENT':
          return state - 1;
        default:
          return state;
      }
    }

    this.store = createStore(this.reducer);
  }



  

  fetchDemo(){
    axios.get('/api/check')
      .then(res => {
        console.log(res.data)
      })
  }
  
  componentDidMount(){
    this.fetchDemo()
  }
  render() {
    console.log(this.store.getState());
    return (
      <Router>
      <div>
{/* 
          <Navbar />
          {/* <BandProfile /> */}
          {/* <UserDashboard /> */}
          {/* <BandDashboard />  */}

          <Route exact path="/profile" render={() => <div><Navbar /><BandProfile /></div>} />
          <Route exact path="/user" render={() => <div><Navbar /><UserDashboard /></div>} />
          <Route exact path="/band" render={() => <div><Navbar /><BandDashboard /></div>} />
          <Route exact path="/" render={() => <div><Navbar /><UserDashboard /></div>} />

          <Route exact path="/myshows" render={() => <div><Navbar /><div>Placeholder for filtered shows.</div></div>} />
          <Route exact path="/logout" render={() => <div><Navbar /><div>Placeholder auth / logout.</div></div>} />

          <Route exact path="/band/upcoming" render={() => <div><Navbar /><BandDashboard tab="upcoming" /></div>} />
          <Route exact path="/band/finalize" render={() => <div><Navbar /><BandDashboard tab="finalize" /></div>} />
          <Route exact path="/band/potential" render={() => <div><Navbar /><BandDashboard tab="potential" /></div>} />
          <Route exact path="/band/pitch" render={() => <div><Navbar /><BandDashboard tab="pitch" /></div>} />

      </div>
      </Router>
    );
  }
}

export default App;
