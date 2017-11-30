import React from 'react';

import UpcomingGig from './UpcomingGig';
import PotentialGig from './PotentialGig';

// import axios from 'axios'

import { connect } from 'react-redux';
// import { FETCH_EVENTS } from '../../actions/types';


class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // componentWillMount() {
    //   fetchEvents();
    // }

    render() {
      console.log('in user dashboard:');
      console.log('this.props: ', this.props);
      return (
        <div>
          <div className="row">
            {/* <div className="col">
            </div> */}
            <div className="col">
              <h2>Upcoming Gig'em Shows</h2>
                <div><UpcomingGig/></div>
                <div><UpcomingGig/></div>
              <h2>Potential Gigs</h2>
                <div><PotentialGig /></div>
                <div><PotentialGig /></div>
                <div><PotentialGig /></div>
            </div>
            {/* <div className="col-1">
            </div> */}
          </div>
        </div>
      )
    }
}

function mapStateToProps({ events }){
  return { events }
}

export default  connect(mapStateToProps)(UserDashboard);