import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    // Link
  } from 'react-router-dom'

// import Navbar from '../Navbar';
import BandNavTabs from './BandNavTabs';

import BandUpcomingGig from './BandUpcomingGig';
import BandPotentialGig from './BandPotentialGig';
import BandToFinalize from './BandToFinalize'
import BandPitch from './BandPitch';


export default class BandDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
    return (
        <Router>
            <div>
                <Route exact path="/band" render={() => 
                  <div>
                    <BandNavTabs  tab="upcoming"/>
                    <div className="text-center">
                      <h1 className="display-4">Upcoming Gigs</h1>
                    </div>
                    <BandUpcomingGig/>
                  </div>} />
                <Route exact path="/band/upcoming" render={() => 
                  <div>
                    <BandNavTabs tab="upcoming" />
                    <div className="text-center">
                      <h1 className="display-4">Upcoming Gigs</h1>
                    </div>
                    <BandUpcomingGig />
                  </div>} />
                <Route exact path="/band/finalize" render={() => 
                  <div>
                    <BandNavTabs tab="finalize" />
                    <div className="text-center">
                      <h1 className="display-4">Gigs to Finalize</h1>
                    </div>
                    <BandToFinalize />
                  </div>} />
                <Route exact path="/band/potential" render={() => 
                  <div>
                    <BandNavTabs tab="potential" />
                    <div className="text-center">
                      <h1 className="display-4">Potential Gigs</h1>
                    </div>
                    <BandPotentialGig />
                  </div>} />
                <Route exact path="/band/pitch" render={() => <div>
                  <BandNavTabs tab="pitch" />
                  <div className="text-center">
                      <h1 className="display-4">Pitch a Gig</h1>
                    </div>
                  <BandPitch /></div>} />
            </div>
        </Router>
    )}
}