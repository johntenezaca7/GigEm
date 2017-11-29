import React from 'react';

import BandUpcomingGig from './BandUpcomingGig';
// import PotentialGig from './PotentialGig';

export default class BandDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
    return (
    <div>
    <div className="row">
      {/* <div className="col">
      </div> */}
      <div className="col">
        <h2>Upcoming Gig'em Shows</h2>
          <p><BandUpcomingGig/></p>
          <p><BandUpcomingGig/></p>
      </div>
    </div>
    </div>)
    }
}