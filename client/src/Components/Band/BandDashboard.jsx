import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import moment from 'moment';
import { SubmissionError } from 'redux-form';



import {
    BrowserRouter as Router,
    Route,
    // Link
  } from 'react-router-dom'

// import Navbar from '../Navbar';
// import BandNavTabs from './BandNavTabs';

import BandUpcomingGig from './BandUpcomingGig';
import BandPotentialGig from './BandPotentialGig';
import BandToFinalize from './BandToFinalize'
import BandPitch from './BandPitch';

 class BandDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          finalCommitDate: ''
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dateGrab = this.dateGrab.bind(this);
    }

    handleSubmit(event) {
      // event.preventDefault()
      event.UserId = this.props.bandInfo.id;
      event.finalCommitDate = this.state.finalCommitDate; 
      console.log("SUBMITTED", event );
      
      if (!event.eventName) {
        throw new SubmissionError({ eventName: <b>YOUR EVENT NEEDS A NAME</b>, _error: 'Submission failed!' })   
      }
      if (!event.start) {
        throw new SubmissionError({ start: <b>YOUR EVENT NEEDS A START DATE</b>, _error: 'Submission failed!' })   
      }
      if (!event.minCommits) {
        throw new SubmissionError({ minCommits: <b>YOUR EVENT NEEDS A MIN ATTENDANCE</b>, _error: 'Submission failed!' })   
      }      
      this.props.addNewVenue(event)
      .then(() => {
        console.log("PROMISED EVENT", event);
        event.VenueId = this.props.venueInfo.id;
        this.props.addNewEvent(event)
        .then(() => {
          this.props.sendNewEventEmail(event);
        });
      })
    };

    dateGrab(date) {
      date = date.format();
      // console.log('GRABBBBINNNGGG ', date);
      this.setState({
        finalCommitDate: date
      })
    }

    render() {

      // console.log('DASH PROPS:', this.props);
    return (
        <Router>
            <div className="band-dashboard">
                <Route exact path="/band" render={() => 
                  <div>
                    {/* <BandNavTabs  tab="upcoming"/> */}
                    <div className="text-center">
                      <h1 className="display-4">Upcoming Gigs</h1>
                    </div>
                    <BandUpcomingGig/>
                  </div>} />
                <Route exact path="/band/upcoming" render={() => 
                  <div>
                    {/* <BandNavTabs tab="upcoming" /> */}
                    <div className="text-center">
                      <h1 className="display-4">Upcoming Gigs</h1>
                    </div>
                    <BandUpcomingGig />
                  </div>} />
                <Route exact path="/band/finalize" render={() => 
                  <div>
                    {/* <BandNavTabs tab="finalize" /> */}
                    <div className="text-center">
                      <h1 className="display-4">Gigs to Finalize</h1>
                    </div>
                    <BandToFinalize />
                  </div>} />
                <Route exact path="/band/potential" render={() => 
                  <div>
                    {/* <BandNavTabs tab="potential" /> */}
                    <div className="text-center">
                      <h1 className="display-4">Potential Gigs</h1>
                    </div>
                    <BandPotentialGig />
                  </div>} />
                <Route exact path="/band/pitch" render={() => <div>
                  {/* <BandNavTabs tab="pitch" /> */}
                  <div className="text-center">
                      <h1 className="display-4">Pitch a Gig</h1>
                    </div>
                  <BandPitch user={this.props.user} 
                  onSubmit={this.handleSubmit}
                  dateGrab={this.dateGrab}/></div>} />
            </div>
        </Router>
    )}
}

function mapStateToProps(state) {
  return {
    user: state.auth,
    bandInfo: state.info,
    venueInfo: state.venues
  }
}


export default connect(mapStateToProps, actions)(BandDashboard);