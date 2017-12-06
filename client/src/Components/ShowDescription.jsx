import React from 'react';

import GigText from './User/GigText'
import Navbar from './Navbar'

import { connect } from 'react-redux';
import { fetchEvents, checkAttendance } from '../actions/index';

class ShowDescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  conditionalRendering(selectedEvent) {
    if (selectedEvent.isCommitted) {
      return (
        <div>
          Fully Commited <span role="img" aria-label="celebrate">🎉</span>
          Venue Placeholder<br />
          Doors @ {selectedEvent.start_time}
        </div>
      )
    } else {
      return (
        <GigText user={this.props.auth.id} keys={selectedEvent.id} gig={selectedEvent} usercommitted={this.props.attendance.includes(selectedEvent.id)} />
      )
    }
  }

  render() {
    // console.log(this);
    console.log('showDescription showId', parseInt(this.props.match.params.showId));
    let selectedEvent = this.props.events[0] ? this.props.events.filter((x) => x.id === parseInt(this.props.match.params.showId))[0] : [{}];
    return (
      <div>
        <div>
        <Navbar />
        </div>
        <div className="container">
          <h1 className="display-1">{selectedEvent.name}</h1>
          <h2>ShowId: {this.props.ShowId}</h2>
          <div>{selectedEvent.description}</div>
          <div><br /></div>
          <div><h5>Venue Placeholder</h5></div>
          <div>{`${selectedEvent.city}, ${selectedEvent.state}`}</div>
          <div>{`${selectedEvent.zip}`}</div>
          <div><br /></div>
          <div><h5>My attendance:</h5></div>
          <div>{this.conditionalRendering(selectedEvent)}</div>
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