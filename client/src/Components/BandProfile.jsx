import React from 'react';

import Navbar from './Navbar'
// import PotentialGig from './User/PotentialGig'
// import UpcomingGig from './User/UpcomingGig'

import BandUpcomingGig from './Band/BandUpcomingGig';
import BandPotentialGig from './Band/BandPotentialGig';

import { connect } from 'react-redux';
import { fetchEvents, fetchAllUsers, editUserProfile, fetchUserProfile } from '../actions/index';
import Profile from './ProfilePage';

import { RIEInput, RIETextArea } from 'riek';
import _ from 'lodash'

class BandProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
      console.log('bandprofile props: ', this.props);
      console.log('matched url user: ', parseInt(this.props.match.params.bandId,10))
      var selectedUser = this.props.users.filter((x) => x.id === parseInt(this.props.match.params.bandId,10))[0];
      if (!selectedUser && !this.props.user) selectedUser = {id: -1}
      let eventsCommitMap = this.props.events
        .filter((x) => x.isCommitted === true && x.UserId === selectedUser.id)
      let eventsPotentialMap = this.props.events
        .filter((x) => x.isCommitted === false && x.UserId === selectedUser.id)
      console.log('selectedUser: ', selectedUser);
      console.log('events potential map: ', eventsPotentialMap)

      if (selectedUser.id !== this.props.info.id) {
        return (
            <div>
              <div>
                <Navbar />
              </div>
                <div className="bandProfile-wrapper">
                    <div>
                    </div>
                    <div className="bandContent-wrapper ">
                        <div>
                          <h4>Band Profile - {selectedUser.name}</h4>
                            <Profile />
                            <div>
                            {`${selectedUser.city ? selectedUser.city : 'Anonymous City'}, ${selectedUser.state ? selectedUser.state : 'Aether'}`}
                            </div>
                            <div className="border border-dark p-1">
                              {selectedUser.description}
                            </div>
                        </div>
                         <div>
                            <h3>Upcoming Shows</h3>
                              <div className="band-show-scroll border border-dark m-2">
                                <BandUpcomingGig />
                              </div>
                            <h3>Potential Gigs</h3>
                            <div className="band-show-scroll border border-dark m-2">
                                <BandPotentialGig />
                              </div>
                            </div>
                          <div className="band-media">
                              <h3>Video Placeholder</h3>
                              <div className="side-scrolling border border-dark text-center">
                                <img src="../Assets/videoPlayer.svg" className="grid-image" alt="videoplayer" />
                            
                                <img src="../Assets/videoPlayer.svg" className="grid-image" alt="videoplayer" />
          
                                <img src="../Assets/videoPlayer.svg" className="grid-image" alt="videoplayer" />
                              </div>
                          </div>
                          
                        </div>
                        <div>

                        </div>
                  </div>
                
            </div>
        )} else {
        return (<div>
          <div>
            <Navbar />
          </div>
            <div className="bandProfile-wrapper">
                <div>
                </div>
                <div className="bandContent-wrapper ">
                    <div>
                      <h4>Band Profile - {selectedUser.name} (Your Profile)</h4>
                        <Profile />
                        <div>
                        {/* {`${selectedUser.city ? selectedUser.city : 'Anonymous City'}, */ }
                        <RIEInput 
                          value={this.props.info.city || 'City placeholder'}
                          change={(e) => this.props.editUserProfile(e)}
                          propName='city'
                          validate={_.isString} />{`, `}
                        <RIEInput
                          value={this.props.info.state || 'State placeholder'}
                          change={(e) => this.props.editUserProfile(e)}
                          propName='state'
                          validate={_.isString} />
                        </div>   
                        <div className="border border-dark p-1">
                          {selectedUser.description ? selectedUser.description : 'Band placeholder'}                        
                        </div>
                    </div>
                     <div>
                        <h3>Upcoming Shows</h3>
                          <div className="band-show-scroll border border-dark m-2">
                            <BandUpcomingGig />
                          </div>
                        <h3>Potential Gigs</h3>
                        <div className="band-show-scroll border border-dark m-2">
                            <BandPotentialGig />
                          </div>
                        </div>
                      <div className="band-media">
                          <h3>Video Placeholder</h3>
                          <div className="side-scrolling border border-dark text-center">
                            <img src="../Assets/videoPlayer.svg" className="grid-image" alt="videoplayer" />
                        
                            <img src="../Assets/videoPlayer.svg" className="grid-image" alt="videoplayer" />
      
                            <img src="../Assets/videoPlayer.svg" className="grid-image" alt="videoplayer" />
                          </div>
                      </div>
                      
                    </div>
                    <div>

                    </div>
              </div>

        </div>)
      }
    }
}

function mapStateToProps({ events, auth, attendance, users, info }){
  return { 
    attendance: attendance,
    events: events,
    auth: auth,
    users: users,
    info: info
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: (e) => {
      dispatch(fetchEvents())
      dispatch(fetchAllUsers())
    },
    editUserProfile: (e) => {
      dispatch(editUserProfile(e))
      .then(() => dispatch(fetchUserProfile()))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BandProfile);