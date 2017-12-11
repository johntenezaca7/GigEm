import React from 'react';
// import GigText from './GigText';
import PotentialGig from './PotentialGig';
import UpcomingGig from './UpcomingGig';

import { connect } from 'react-redux';
import { /* fetchUser, */ fetchUserProfile, fetchEvents, checkAttendance, editUserProfile } from '../../actions/index';

import { /* RIEToggle, */ RIEInput, RIETextArea, /*RIENumber, RIETags, RIESelect */} from 'riek'
import _ from 'lodash'
import Profile from '../ProfilePage';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props;
        this.props.init();
    }

    componentWillMount() {
      this.props.init();
    }

    renderProfileType() {
      // console.log('renderProfileType this.props', this.props);
      if (this.props.info.isBand) {
        return (`Band`)
      } else {
        return (`User`)
      }
    }

    renderChangeButton() {
      if (this.props.info.isBand) {
        return (
          <button className="btn btn-success my-2 my-sm-0" onClick={(e) => this.props.editUserProfile({'isBand': false})}>
          Change User Type to User
          </button>
        )
      } else {
          return (
            <button className="btn btn-success my-2 my-sm-0" onClick={(e) => this.props.editUserProfile({'isBand': true})}>
            Change User Type to Band
            </button>
          )
      }
    }

    render() {
      // console.log('userProfile props: ', this.props);
      let userAttendance = this.props.attendance.length > 0 ? 
      this.props.attendance
      .filter((x) => x.UserId === this.props.info.id) 
      .map((x) => x = x.ShowcaseId) : [];
      
      if(this.props.info){
        return (
          <div>
                <div className="userProfile-wrapper"> 
                  <div className="user-side-bar nested">
                      <div>
                        <div>
                          Username: 
                          <RIEInput 
                          value={this.props.info.name || 'No username!'}
                          change={(e) => this.props.editUserProfile(e)}
                          propName='name'
                          validate={_.isString} />
                        </div>
                        <div>
                          Profile Type - {this.renderProfileType()}
                        </div>
                        <div>
                         <Profile />
                        </div>
                        <div>
                          <RIEInput 
                            value={this.props.info.email || 'No email'}
                            change={(e) => this.props.editUserProfile(e)}
                            propName='email'
                            validate={_.isString} />
                        </div>
                        <div>
                          <RIEInput 
                          value={this.props.info.city || 'city'}
                          change={(e) => this.props.editUserProfile(e)}
                          propName='city'
                          validate={_.isString} />
                          </div>
                         
                          <div>
                            <RIEInput
                              value={this.props.info.state || 'state'}
                              change={(e) => this.props.editUserProfile(e)}
                              propName='state'
                              validate={_.isString} />
                          </div>   
                        </div>
                        <div >
                          <RIETextArea
                          value={this.props.info.description || 'Write your description here!'}
                          change={(e) => this.props.editUserProfile(e)}
                          propName='description'
                          validate={_.isString} />
                        </div>
                  </div>
                  <div>
                    <h1> Past Shows </h1>
                    <div className="inside-wall">
                      <div className="each-h-block">
                        Show 1
                        </div>
                      <div>Show 1 </div>
                      <div>Show 1 </div>
                      <div>Show 1 </div>
                      <div>Show 1 </div>
                      <div>Show 1 </div>
                      <div>Show 1 </div>
                      <div>Show 1 </div>
                      <div>Show 1 </div>
                      <div>Show 1 </div>
                      <div>Show 1 </div>
                      <div>Show 1 </div>
                      <div>Show 1 </div>
                      <div>Show 1 </div>
                      <div>Show 1 </div>
                    </div>
                  </div>
                  <div>
                        <h3>Upcoming Shows</h3>
                         <div className="band-show-scroll">
                          {this.props.events
                            .filter((x) => userAttendance.includes(x.id) && x.isCommitted === true)
                            .map((x) => <UpcomingGig user={this.props.info.id} key={x.id} gig={x} usercommitted={userAttendance.includes(x.id)}/>)
                          }
                          </div>
                          <br />
                        <h3>Potential Gigs</h3>
                        <div className="band-show-scroll">
                        {this.props.events
                            .filter((x) => userAttendance.includes(x.id) && x.isCommitted === false)
                            .map((x) => <PotentialGig user={this.props.info.id} key={x.id} gig={x} usercommitted={userAttendance.includes(x.id)}/>)
                          }
                          </div>
                      </div>
                      
                
              </div>
            </div>
        )
      } else {
        return(<div> </div>)

      }
    }
}

function mapStateToProps({events, attendance, auth, info  }){
    return {
      attendance: attendance,
      events: events,
      info: info
     }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      init: () => {
        dispatch(fetchUserProfile())
        dispatch(fetchEvents())
        dispatch(checkAttendance())
      },
      editUserProfile: (e) => {
        dispatch(editUserProfile(e))
        .then(() => dispatch(fetchUserProfile()))
      }
    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

