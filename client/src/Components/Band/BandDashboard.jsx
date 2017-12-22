import React from 'react';
import {
  connect
} from 'react-redux';
import * as actions from '../../actions';
import {
  SubmissionError
} from 'redux-form';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import BandPitch from './BandPitch';
import UpcomingGig from '../User/UpcomingGig';

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
    event.UserId = this.props.bandInfo.id;
    event.finalCommitDate = this.state.finalCommitDate;
    // prevents event submission if no eventName or start date
    if (!event.eventName || !event.finalCommitDate) {
      throw new SubmissionError({
        eventName: <b>ALL EVENTS NEEDS A NAME AND START DATE</b>,
        _error: 'Submission failed!'
      })
    } else {
      // marks event TBD if No Venue box is checked
      if (event.hasNoVenue) {
        event.venueName = "TBD";
        event.venueDescription =
          `This event needs a venue. 
          If you would like to host this venue please reach out to us.`
      }
      // adds a venue for every event
      this.props.addNewVenue(event)
        .then(() => {
          event.VenueId = this.props.venueInfo.id;
          event.formatPhoneNumber = (s) => {
            var s2 = ("" + s)
              .replace(/\D/g, '');
            var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
            return (!m) ? null : m[1] + m[2] + m[3];
          }
          // formats phone # entry with regex
          event.phone = event.formatPhoneNumber(event.phone);
          // creates new event
          this.props.addNewEvent(event)
            .then(() => {
              event.email = this.props.bandInfo.email;
              event.toName = this.props.bandInfo.name;
              event.eventId = this.props.event.id;
              this.props.sendNewEventEmail(event)
            });
        })
        .then(() => {
          // check for a phone entry with 10 chars
          if (!event.phone || event.phone.length < 10) {
            // maybe do something, maybe do nothing
          } else {
            // for phone #s with 10char or more, update user profile and send text                    
            this.props.editUserProfile({
                phone: event.phone
              })
              .then(() => {
                this.props.sendNewEventText(event)
              })
          }
        })
        .then(() => {
          this.setState({
            eventcomplete: true
          });
        })
    }
  };

  dateGrab(date) {
    date = date.format();
    this.setState({
      finalCommitDate: date
    })
  }

  render() {
    if (this.state.eventcomplete) {
      console.log("MORE PROPS:", this.props)
      const userId = this.props.bandInfo.id
      const redirectTo = `/bandprofile/${userId}`;
      return (<Redirect to={redirectTo} />)
    }

    return (
      <Router>
            <div className="band-dashboard">
                <Route exact path="/band" render={() => 
                  <div>
                    <div className="text-center">
                      <h1 className="display-4">Upcoming Gigs</h1>
                    </div>
                    {this.props.events
                      .filter((x) => (x.commits >= x.minCommits || x.isCommitted) && x.UserId === this.props.info.id)
                      .map((gig) => <UpcomingGig 
                        user={this.props.info.id} 
                        key={gig.id} 
                        userAttendance=
                          {Array.isArray(this.props.attendance) ?  
                            this.props.attendance.filter((x) => 
                              x.ShowcaseId === gig.id && x.UserId === this.props.info.id) 
                            : [{}]
                          }
                        gig={gig}/>)
                    }
                  </div>} />
                <Route exact path="/band/upcoming" render={() => 
                  <div>
                    <div className="text-center">
                      <h1 className="display-4">Upcoming Gigs</h1>
                    </div>
                    {this.props.events
                      .filter((x) => x.commits >= x.minCommits && x.UserId === this.props.info.id)
                      .map((gig) => <UpcomingGig 
                        user={this.props.info.id} 
                        key={gig.id} 
                        userAttendance=
                          {Array.isArray(this.props.attendance) ?  
                            this.props.attendance.filter((x) => 
                              x.ShowcaseId === gig.id && x.UserId === this.props.info.id) 
                            : [{}]
                          }
                        gig={gig}/>)
                    }
                  </div>} />
                <Route exact path="/band/potential" render={() => 
                  <div>
                    <div className="text-center">
                      <h1 className="display-4">Potential Gigs</h1>
                    </div>
                    {this.props.events
                      .filter((x) => x.commits < x.minCommits && x.UserId === this.props.info.id)
                      .map((gig) => <UpcomingGig 
                        user={this.props.info.id} 
                        key={gig.id} 
                        userAttendance=
                          {Array.isArray(this.props.attendance) ?  
                            this.props.attendance.filter((x) => 
                              x.ShowcaseId === gig.id && x.UserId === this.props.info.id) 
                            : [{}]
                          }
                        gig={gig}/>)
                    }
                  </div>} />
                <Route exact path="/band/pitch" render={() => <div>
                  <div className="text-center">
                      <h1 className="display-4">Pitch a Gig</h1>
                    </div>
                  <BandPitch user={this.props.user} 
                  onSubmit={this.handleSubmit}
                  dateGrab={this.dateGrab}/></div>} />
            </div>
        </Router>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth,
    bandInfo: state.info,
    venueInfo: state.venues,
    event: state.event,
    events: state.events,
    info: state.info,
    profile: state.profile
  }
}

export default connect(mapStateToProps, actions)(BandDashboard);