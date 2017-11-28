import React from 'react';

// import UpcomingGig from './Components/UpcomingGig';

export default class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
      return (
        <div>
          <div className="row">
            <div className="col-1">
            </div>
            <div className="col-8">
              <h2>Upcoming Gig'em Shows</h2>
                <p>Committed Show Component Placeholder</p>
                <p>Committed Show Component Placeholder</p>
              <h2>Potential Gigs</h2>
                <p>Potential Show Component Placeholder</p>
                <p>Potential Show Component Placeholder</p>
            </div>
            <div className="col-1">
            </div>
          </div>
        </div>
      )
    }
}