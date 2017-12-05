import React from 'react';

import UpcomingGig from './UpcomingGig';
import PotentialGig from './PotentialGig';

// import axios from 'axios'

import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/index';


class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
      this.props.onFetchClick();
    }

    fetchEvents(e) {
      e.preventDefault();
      this.props.onFetchClick();
    }

    render() {
      // console.log('userdashboard props', this.props);
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
                  .map((x) => <PotentialGig user={this.props.auth.id} key={x.id} gig={x} />)
              }
            </div>
          </div>
        </div>
      )
    }
}

function mapStateToProps({ events, auth }){
  return { 
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);