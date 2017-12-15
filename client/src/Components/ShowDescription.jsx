import React from 'react';

import GigText from './User/GigText'
// import Navbar from './Navbar'

import { connect } from 'react-redux';
import { fetchEvents, checkAttendance } from '../actions/index';

class ShowDescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  conditionalRendering(event) {
    if (event.isCommitted) {
      return (
        <div>
          Fully Commited <span role="img" aria-label="celebrate">🎉</span>
          {event.address}<br />
          Doors @ {event.start_time}
          {/* <GigText user={this.props.auth.id} keys={event.id} gig={event} usercommitted={this.props.attendance.includes(event.id)} /> */}
        </div>
      )
    } else {
      return (
        <GigText user={this.props.auth.id} keys={event.id} gig={event} usercommitted={this.props.attendance.includes(event.id)} />
      )
    }
  }

  render() {
    // console.log('fr');
    // console.log('showd passed down ', this.props.showId);
    const passedId = this.props.showId
    let selectedEvent = this.props.events.filter(show => show.id === passedId)
    let event = selectedEvent[0]
    console.log('HER',event)
    return (
      <div>
        <div className="container">
          <h1 className="display-1">{event.name}</h1>
          <h2>ShowId: {this.props.ShowId}</h2>
          <div>{event.description}</div>
          <div><br /></div>
          <div><h5>Venue Placeholder</h5></div>
          <div>{`${event.city}, ${event.state}`}</div>
          <div>{`${event.zip}`}</div>
          <div><br /></div>
          <div><h5>My attendance:</h5></div>
          <div>{this.conditionalRendering(event)}</div>
        </div>
      
    </div>
    )
  }
}

function mapStateToProps({ events, auth, attendance }){
  return { 
    attendance: attendance,
    events: events,
    auth: auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: (e) => {
      dispatch(fetchEvents())
      dispatch(checkAttendance())
    },
    onFetchClick: id => {
      dispatch(fetchEvents());
    },
    checkAttendanceDispatch: (user) => {
      dispatch(checkAttendance())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowDescription);