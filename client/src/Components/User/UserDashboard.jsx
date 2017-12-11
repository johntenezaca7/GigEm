import React from 'react';

import UpcomingGig from './UpcomingGig';
import PotentialGig from './PotentialGig';

// import axios from 'axios'

import { connect } from 'react-redux';
import { fetchEvents, checkAttendance } from '../../actions/index';
import Map from '../googleMaps';


class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.props.init();

    }
    componentWillMount() {
      this.props.onFetchClick();

    }

    fetchEvents(e) {
      e.preventDefault();
      this.props.onFetchClick();
    }

    componentDidMount() {
      // console.log('UserDashboard.jsx this.props.auth.id in componentWillMount() method');
      // console.log(this.props.auth.id);
      this.props.checkAttendanceDispatch(this.props.auth.id);
    }
  

    render() {
      // console.log('UserDashboard.jsx this.props.auth in render() method:')
      // console.log(this.props.auth);

      return (
        <div >
          <Map    
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
           <div className="upComing-Po-Gigs">
             <div>
                <h2>Upcoming Gig'em Shows</h2>
                  <div className="user-show-scroll">
                      {/* <button className="btn btn-danger my-2 my-sm-0" onClick={(e) => this.fetchEvents(e)} >Fetch Events</button> */}
                      {
                        this.props.events
                          .filter((x) => x.isCommitted === true)
                          .map((x) => <UpcomingGig user={this.props.auth.id} key={x.id} gig={x} usercommitted={this.props.attendance.includes(x.id)} />)
                      }
                  </div> 
             </div> 
             <div>
                <div>
                  <h2>Potential Gigs</h2>
                    <div className="user-show-scroll">
                      {
                        this.props.events
                          .filter((x) => x.isCommitted === false)
                          .map((x) => <PotentialGig user={this.props.auth.id} key={x.id} gig={x} usercommitted={this.props.attendance.includes(x.id)}/>)
                      }
                  </div>
                </div>
              </div>
           </div>
        </div>
      )
    }
}

function mapStateToProps({ events, auth, attendance, info }){
  return { 
    attendance: attendance,
    events: events,
    auth: auth,
    info: info
  }
}

const mapDispatchToProps = dispatch => {
  //console.log('mapdispatch to props: ', dispatch);
  return {
    init: (e) => {
      //   dispatch(fetchUser())
      //   .then(() => fetchUserProfile())
      //   .then(() => 
      dispatch(fetchEvents())
      dispatch(checkAttendance())
    },
    onFetchClick: id => {
      //console.log('onFetchClick id: ', id)
      dispatch(fetchEvents());
    },
    checkAttendanceDispatch: (user) => {
      dispatch(checkAttendance())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);