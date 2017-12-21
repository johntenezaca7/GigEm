import React from 'react';
import {
  connect
} from 'react-redux';
import {
  editUserProfile,
  fetchUserProfile,
  fetchProperties,
  addProperty
} from '../../actions/index';

import {
  RIEInput,
  RIETextArea
} from 'riek';
import _ from 'lodash'

import Navbar from '../Navbar';
// import BandUpcomingGig from './BandUpcomingGig';
import UpcomingGig from '../User/UpcomingGig';
import MediaItem from './MediaItem';
import Profile from './ProfileImage';



class BandProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkurl: '',
      description: '',
      bandProNav: 'upcoming',
    };
    this.props.fetchProperties();
    this.onClick = this.onClick.bind(this);
  }

  onClick(obj) {
    this.setState({
      bandProNav: obj.value
    })
    this.forceUpdate()

  }



  handleChange(event, stateitem) {
    // eslint-disable-next-line
    if (!stateUpdate) {
      var stateUpdate = {};
    };
    stateUpdate[stateitem] = event.target.value;
    this.setState(stateUpdate);
    // console.log('current user properties: ', this.props.properties)
  }

  handleClick(event, selectedUser) {
    event.preventDefault();
    // console.log('======================= - handling click')
    this.props.submitProperty(selectedUser.id, this.state.description, this
      .state.linkurl);
  }

  renderContent() {
    var selectedUser = this.props.users.filter((x) => x.id === parseInt(
      this.props.match.params.bandId, 10))[0];
    if (!selectedUser && !this.props.user) selectedUser = {
      id: -1
    }

    
    switch (this.state.bandProNav) {
      case 'upcoming':
        return (
          <div>     
                <div className="band-show-scroll ">
                {this.props.events
              .filter((x) => x.UserId === selectedUser.id && x.commits >= x.minCommits)
                .map((gig) => <UpcomingGig 
                  user={selectedUser.id} 
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
                        <h3>Potential Gigs</h3>
                        <div className="band-show-scroll ">
                        {this.props.events
                        .filter((x) => x.UserId === selectedUser.id && x.commits < x.minCommits)
                          .map((gig) => <UpcomingGig 
                            user={selectedUser.id} 
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
      }
    }


  render() {
    // console.log('rerendering bandprofile this.prosp: ', this.props);

    var selectedUser = this.props.users.filter((x) => x.id === parseInt(
      this.props.match.params.bandId, 10))[0];
    if (!selectedUser && !this.props.user) selectedUser = {
      id: -1
    }


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
                            <Profile profileUser={selectedUser} />
                            <div>
                            {`${selectedUser.city ? selectedUser.city : 'Anonymous City'}, ${selectedUser.state ? selectedUser.state : 'Aether'}`}
                            </div>
                            <div >
                              {selectedUser.description}
                            </div>
                        </div>
                         <div>
                            <h3>Upcoming Shows</h3>
                              <div >
                              {this.props.events
                                  .filter((x) => x.UserId === selectedUser.id && x.commits >= x.minCommits)
                                    .map((gig) => <UpcomingGig 
                                      user={selectedUser.id} 
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
                            <h3>Potential Gigs</h3>
                            <div >
                            {this.props.events
                        .filter((x) => x.UserId === selectedUser.id && x.commits < x.minCommits)
                          .map((gig) => <UpcomingGig 
                            user={selectedUser.id} 
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
                          <div className="band-media">
                          <div className="side-scrolling  text-center">
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
      )
    } else {
      return (
        <div>
          <div>
            <Navbar />
          </div>
            <div className="bandProfile-wrapper">
                <div>
                </div>
                <div className="bandContent-wrapper ">
                    <div className="band-profile-content"> 
                      <h4>Band Profile - {selectedUser.name}<br /> (Your Profile)</h4>
                      <Profile profileUser={selectedUser} />
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
                      <div className="user-dashboard-leftcolumn">
                          <div className="nav nav-tabs user-dashboard-nav justify-content-center"> 
                            <li className="nav-item">
                              <a className={this.state.bandProNav === 'upcoming' ? `nav-link active` : `nav-link`} href="#upcoming" onClick={() => {this.onClick({value: 'upcoming'})}}>Upcoming Gigs</a>
                            </li>
                            <li className="nav-item">
                              <a className={this.state.bandProNav === 'potential' ? `nav-link active` : `nav-link`} href="#potential" onClick={() => {this.onClick({value: 'potential'})}}>Potential Gigs</a>
                            </li>
                          </div>
                          <div className="user-dashboard-content">
                          <br/>
                            {this.renderContent()}
                          </div>
                      </div>
                    </div>
                      <div className="band-media">
                        <div className="side-scrolling  text-center ">
                            <h3>Band Media</h3>
                          <div className="container ">
                            <h6>Submit Additional Videos:</h6>
                            <div class="form-group">
                              {/* <label for="fileUrl">Url</label> */}
                              Url <small id="url-help" class="form-text text-muted">(requires http://)</small>
                              <input type="text" className="form-control form-control-sm" value={this.state.linkurl} id="fileUrl" onChange={(e) => this.handleChange(e, 'linkurl')} />
                              {/* <label for="description">Description</label> */}
                              Description
                              <input type="text" className="form-control form-control-sm" value={this.state.description} onChange={(e) => this.handleChange(e, 'description')} />
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
        </div>
      )
    }
  }
}

function mapStateToProps({
  events,
  auth,
  attendance,
  users,
  info,
  properties
}) {
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
    
    fetchProperties: () => {
      dispatch(fetchProperties())
    },
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

