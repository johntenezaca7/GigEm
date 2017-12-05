import React from 'react';

// import UpcomingGig from './UpcomingGig';
import PotentialGig from './PotentialGig';

// import axios from 'axios'

import { connect } from 'react-redux';
import { fetchEvents, checkAttendance } from '../../actions/index';


class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.props.onFetchClick();

    }

    fetchEvents(e) {
      e.preventDefault();
      this.props.onFetchClick();
    }

    componentDidMount() {
      console.log('UserDashboard.jsx this.props.auth.id in componentWillMount() method');
      console.log(this.props.auth.id);
      this.props.checkAttendanceDispatch(this.props.auth.id);
    }

    render() {
      // console.log('UserDashboard.jsx this.props.auth in render() method:')
      // console.log(this.props.auth);

      return (
        <div>
          <div className="row">
            <div className="col col-1">
            </div>
            <div className="col">
            <h2>Upcoming Gig'em Shows</h2>
              <button className="btn btn-danger my-2 my-sm-0" onClick={(e) => this.fetchEvents(e)} >Fetch Events</button>
              {/* {
                this.props.events
                  .filter((x) => x.isCommitted === true)
                  .map((x) => <UpcomingGig key={x.id} gig={x} />)
              } */}
              <h2>Potential Gigs</h2>
              {
                this.props.events
                  .filter((x) => x.isCommitted === false)
                  .map((x) => <PotentialGig user={this.props.auth.id} key={x.id} gig={x} usercommitted={this.props.attendance.find((a) => a.UserId === this.props.auth.id && a.ShowcaseId === x.id)}/>)
              }
            </div>
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
  //console.log('mapdispatch to props: ', dispatch);
  return {
    onFetchClick: id => {
      //console.log('onFetchClick id: ', id)
      dispatch(fetchEvents())
    },
    checkAttendanceDispatch: (user) => {
      dispatch(checkAttendance(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);