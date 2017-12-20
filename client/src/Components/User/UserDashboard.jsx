import React from 'react';
import {
  connect
} from 'react-redux';
import {
  fetchEvents,
  checkAttendance,
  fetchAllUsers
} from '../../actions/index';
import axios from 'axios';

import Map from './GoogleMaps';
import UpcomingGig from './UpcomingGig';
import Board from './ChatBoard';


class UserDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      show: false,
      dashNav: 'upcoming',
    };
    this.changeState = this.changeState.bind(this);
    this.onClick = this.onClick.bind(this);
    this.props.init();
  }

  onClick(obj) {
    this.setState({
      dashNav: obj.value
    })
    this.props.init();
  }

  componentDidMount() {
    if (this.props.events) {
      this.props.events.map((place, id) => {
        return axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${place.address},%20NY%2010017&key=AIzaSyCn1886_Sxx7XVDi4xAjhKCKigLJyoxtvU`
          )
          .then(res => this.state.locations.push([res.data.results[0].geometry
            .location, place, {
              showInfo: false
            }
          ]))
      });
    }
  }

  changeState(info) {
    this.setState({
      show: true
    })
  }

  renderContent() {
    switch (this.state.dashNav) {
      case 'upcoming':
        return (
          <div> 
                    <h2>Upcoming Gig'em Shows</h2>
                    <div className="user-show-scroll">
                    {this.props.events
                      .filter((x) => x.commits >= x.minCommits)
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
                    </div>
                  </div>
        );
      case 'potential':
        return (
          <div>
                    <h2>Potential Gigs</h2>
                    <div className="user-show-scroll">
                      { this.props.events
                      .filter((x) => x.commits < x.minCommits)
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
                    </div>       
                  </div>
        );
      case 'chat':
        return (
          <div>
                <Board />      
            </div>
        );
      default:
        return;
    }
  }

  render() {

    return (
      <div className="user-dashboard">   
        <div classname="user-dashboard-leftcolumn">
          <div className="nav nav-tabs user-dashboard-nav justify-content-center"> 
            <li className="nav-item">
              <a className={this.state.dashNav === 'upcoming' ? `nav-link active` : `nav-link`} href="#upcoming" onClick={() => this.onClick({value: 'upcoming'})}>Upcoming Gigs</a>
            </li>
            <li class="nav-item">
              <a className={this.state.dashNav === 'potential' ? `nav-link active` : `nav-link`} href="#potential" onClick={() => this.onClick({value: 'potential'})}>Potential Gigs</a>
            </li>
            <li class="nav-item">
              <a className={this.state.dashNav === 'chat' ? `nav-link active` : `nav-link`} href="#chat" onClick={() => this.onClick({value: 'chat'})}>Community Board</a>
            </li>
          </div>
          <div className="user-dashboard-content">
            {this.renderContent()}
          </div>
        </div>
          <div className="google-maps">
              <Map
                show={this.changeState}
                geoLoc={this.state.locations}  
                center={{lat:40.728199 , lng:-73.9894738}}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `200%`}}/>}   
              />  
            </div>
          </div>
    )
  }
}

function mapStateToProps({
  attendance,
  events,
  info
}) {
  return {
    attendance: attendance,
    events: events,
    info: info,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(fetchEvents())
        .then(() => dispatch(checkAttendance()))
        .then(() => dispatch(fetchAllUsers()))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);