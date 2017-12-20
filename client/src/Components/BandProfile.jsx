import React from 'react';
import Navbar from './Navbar';
import BandUpcomingGig from './Band/BandUpcomingGig';
// import BandPotentialGig from './Band/BandPotentialGig';
import MediaItem from './MediaItem';

import { connect } from 'react-redux';
import { /* fetchEvents, fetchAllUsers, */ editUserProfile, fetchUserProfile, fetchProperties, addProperty } from '../actions/index';
import Profile from './ProfilePage';

import { RIEInput, RIETextArea } from 'riek';
import _ from 'lodash'

class BandProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          linkurl: '',
          description: ''
        };
        this.props.fetchProperties();
    }

    

    handleChange(event, stateitem) {
      // eslint-disable-next-line
      if (!stateUpdate) { var stateUpdate = {}; };
      stateUpdate[stateitem] = event.target.value;
      this.setState(stateUpdate);
      // console.log('current user properties: ', this.props.properties)
    }
  
    handleClick(event, selectedUser) {
      event.preventDefault();
      // console.log('======================= - handling click')
      this.props.submitProperty(selectedUser.id, this.state.description, this.state.linkurl);
    }

    render() {
      // console.log('rerendering bandprofile this.prosp: ', this.props);
      
      var selectedUser = this.props.users.filter((x) => x.id === parseInt(this.props.match.params.bandId,10))[0];
      if (!selectedUser && !this.props.user) selectedUser = {id: -1}


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
                              <BandUpcomingGig potential={false} />
                              </div>
                            <h3>Potential Gigs</h3>
                            <div className="band-show-scroll border border-dark m-2">
                            <BandUpcomingGig potential={true} />
                              </div>
                            </div>
                          <div className="band-media">
                          <div className="side-scrolling border border-dark text-center">
                              <h3>Media</h3>
                              {
                              (this.props.properties) ? this.props.properties
                              .filter((x) => x.UserId === selectedUser.id)
                              .map((x) => {
                                return (<MediaItem item={x} ownUserProfile={false} key={x.id} />)
                              }) : (<div></div>)}
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
                      <h4>Band Profile - {selectedUser.name}<br /> (Your Profile)</h4>
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
                          <RIETextArea
                            value={this.props.info.description || 'Description placeholder'}
                            change={(e) => this.props.editUserProfile(e)}
                            propName='description'
                            validate={_.isString} />               
                        </div>
                    </div>
                     <div>
                        <h3>Upcoming Shows</h3>
                          <div className="band-show-scroll border border-dark m-2">
                            <BandUpcomingGig potential={false} />
                          </div>
                        <h3>Potential Gigs</h3>
                        <div className="band-show-scroll border border-dark m-2">
                            <BandUpcomingGig potential={true} />
                          </div>
                        </div>
                      <div className="band-media">
                        <div className="side-scrolling border border-dark text-center p-1 m-1">
                            <h3>Band Media</h3>
                          <div className="container border border-dark">
                            <h5>Submit Additional Videos:</h5>
                            <div class="form-group">
                              <label for="fileUrl">Url</label>
                              <input type="text" className="form-control" value={this.state.linkurl} id="fileUrl" onChange={(e) => this.handleChange(e, 'linkurl')} />
                              <small id="url-help" class="form-text text-muted">(requires http://)</small>
                              <br />
                              <label for="description">Description</label>
                              <input type="text" className="form-control" value={this.state.description} onChange={(e) => this.handleChange(e, 'description')} />
                              <button type="submit" className="btn btn-primary btn-sm" value="Add video" onClick={(e) => this.handleClick(e, selectedUser)}>Submit New Item</button>
                            </div>
                          </div>

                            {(this.props.properties) ? this.props.properties
                              .filter((x) => x.UserId === selectedUser.id)
                              .map((x) => {
                              return (<MediaItem item={x} ownUserProfile={true} />)
                              }) : (<div></div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>)
      }
    }
}

function mapStateToProps({ events, auth, attendance, users, info, properties }){
  return { 
    attendance: attendance,
    events: events,
    auth: auth,
    users: users,
    info: info,
    properties: properties
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProperties: () => { dispatch(fetchProperties()) },
    submitProperty: (bandId, description, linkUrl) => {
      dispatch(addProperty(bandId, description, linkUrl))
      .then(() => dispatch(fetchProperties()))
    },
    editUserProfile: (e) => {
      dispatch(editUserProfile(e))
      .then(() => dispatch(fetchUserProfile()))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BandProfile);