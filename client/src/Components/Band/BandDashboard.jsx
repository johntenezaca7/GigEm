import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
// import moment from 'moment';
import { SubmissionError } from 'redux-form';
import {
    BrowserRouter as Router,
    Route,
    Redirect
    // Link
  } from 'react-router-dom'

// import Navbar from '../Navbar';
// import BandNavTabs from './BandNavTabs';

import BandUpcomingGig from './BandUpcomingGig';
import BandPotentialGig from './BandPotentialGig';
import BandPitch from './BandPitch';

 class BandDashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          finalCommitDate: ''
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dateGrab = this.dateGrab.bind(this);
    }

    // this function does A LOT: 
    // takes in a event from redux-form on BandPitch.js
      // prevents event submission if no eventName or start date
      // marks event TBD if No Venue box is checked
      // adds a venue for every event
      // formats phone # entry with regex
      // creates new event
        // emails user with event details
      // updates user profile with phone number if added
        // sends user text confirmation(if provided) with event name
      // redirect user to UpcomingGigs page on successful submisson
    handleSubmit(event) {
      // event.preventDefault()
      event.UserId = this.props.bandInfo.id;
      event.finalCommitDate = this.state.finalCommitDate; 
      // prevents event submission if no eventName or start date
      if (!event.eventName || !event.finalCommitDate) {
        throw new SubmissionError({ eventName: <b>ALL EVENTS NEEDS A NAME AND START DATE</b>, _error: 'Submission failed!' })   
      } else {
        // marks event TBD if No Venue box is checked
        if (event.hasNoVenue) {
          event.venueName = "TBD";
          event.venueDescription = `This event needs a venue. 
          If you would like to host this venue please reach out to us.`
        }
        // adds a venue for every event
        this.props.addNewVenue(event)
        .then(() => {
          // console.log("PROMISED EVENT", event);
          event.VenueId = this.props.venueInfo.id;
          
          event.formatPhoneNumber = (s) => {
            var s2 = (""+s).replace(/\D/g, '');
            var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
            return (!m) ? null : m[1] + m[2]  + m[3];
          }
          // formats phone # entry with regex
          event.phone = event.formatPhoneNumber(event.phone);
          // creates new event
          this.props.addNewEvent(event)
          .then(() => {
            event.email = this.props.bandInfo.email;
            event.toName = this.props.bandInfo.name;
            event.eventId = this.props.event.id;
            // console.log("PROMISED PROPS BEFORE EMAIL", this.props);
            this.props.sendNewEventEmail(event)
          });
        })
        .then(() => {
          // check for a phone entry with 10 chars
          if (!event.phone || event.phone.length < 10) {
            // maybe do something, maybe do nothing
          } else {
            // for phone #s with 10char or more, update user profile and send text                    
            this.props.editUserProfile({phone: event.phone})
            .then(() => {
                console.log("PROMISED PROPS BEFORE TEXT", this.props);                    

                console.log("EVENT BEFORE SENDING TEXT", event);
                this.props.sendNewEventText(event)
            })
          }
        })
        .then(() => {
          // Set state to true to redirect to /band page
          // event.eventName = '';
          console.log("PENULTIMATE EVENT PHASE: ", event)
          this.setState({eventcomplete: true});
        })
      }  
    };

    dateGrab(date) {
      date = date.format();
      // console.log('GRABBBBINNNGGG ', date);
      this.setState({
        finalCommitDate: date
      })
    }

    render() {
      if (this.state.eventcomplete) {
        return( <Redirect to="/band" /> )
      }

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
                {/* <Route exact path="/band/finalize" render={() => 
                  <div>
                    <BandNavTabs tab="finalize" />
                    <div className="text-center">
                      <h1 className="display-4">Gigs to Finalize</h1>
                    </div>
                    <BandToFinalize />
                  </div>} /> */}
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
    venueInfo: state.venues,
    event: state.event,
    profile: state.profile
  }
}


export default connect(mapStateToProps, actions)(BandDashboard);