import React from 'react';
import GigText from './GigText';

import { connect } from 'react-redux';
import { /* fetchUser, fetchUserProfile, fetchEvents, checkAttendance, */ editUserProfile } from '../../actions/index';

import { /* RIEToggle, */ RIEInput /*, RIETextArea, RIENumber, RIETags, RIESelect */} from 'riek';
import _ from 'lodash';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }

    // componentWillMount() {
    //   this.props.init();
    // }

    render() {

      console.log('userProfile props:PROFILE ', this.props);
        return (
          <div>
            <div className="alert alert-primary text-center" role="alert">
              Edit your profile by clicking on the text fields!
            </div>
                <div className=" userProfile-wrapper">
                      <div className="user-side-bar nested">
                        <div>
                          <div>
                                <RIEInput 
                                value={ this.props.info.name || 'No username!'}
                                change={(e) => this.props.editUserProfile(e)}
                                propName='name'
                                validate={_.isString} />
                                <br />
                                <img src="./Assets/userLogo.svg" width="200px" height="200px" alt="Bandname"/>  
                                
                            </div>
                            <div>
                                <RIEInput 
                                  value={this.props.profile.city || 'City'} 
                                  change={(e) => this.props.editUserProfile(e)}
                                  propName='city'
                                  validate={_.isString} />,
                            </div>
                            <div>
                                <RIEInput 
                                  value={this.props.profile.state || 'State'}
                                  change={(e) => this.props.editUserProfile(e)}
                                  propName='state'
                                  validate={_.isString} />
                            </div>
                            <div>
                                <RIEInput 
                                value={this.props.info.email || 'No email'}
                                change={(e) => this.props.editUserProfile(e)}
                                propName='email'
                                validate={_.isString} />
                            </div>
                          </div>
                            <div >
                            <RIEInput 
                              value={this.props.profile.description || 'Write your description here!'}
                              change={(e) => this.props.editUserProfile(e)}
                              propName='description'
                              validate={_.isString} />
                            </div>
                        </div>
                        <div className="user-wall">
                            <h1>Past Shows </h1>
                            <div className="inside-wall">
                              <div className="each-h-block">
                                 <div>
                                  <img src="../Assets/userLogo.svg" width="40px" height="40px" alt="User Logo" />

                                 </div> 
                                <div>
                                  Event Name
                                  </div>
                                  <div>
                                  Location
                                  </div>

                              </div>
                              <div>Show2</div>
                              <div>Show3</div>
                              <div>Show4</div>
                              <div>Show5</div>
                              <div>Show6</div>
                            </div>
                        </div>
                        <div className="up-comingShows">
                          <div>
                            <h3>Upcoming Shows</h3>
                              {this.props.events
                                .filter((x) => x.isCommitted === true)
                                .filter((x) => this.props.attendance.includes(x.id))
                                .map((x) => <GigText user={this.props.auth.id} key={x.id} gig={x} usercommitted={this.props.attendance.includes(x.id)}/>)
                              }
                          </div>
                          <div>
                          <br />
                            <h3>Potential Gigs</h3>
                            {this.props.events
                              .filter((x) => x.isCommitted === false)
                              .filter((x) => this.props.attendance.includes(x.id))
                              .map((x) => <GigText user={this.props.auth.id} key={x.id} gig={x} usercommitted={this.props.attendance.includes(x.id)}/>)
                            }
                          </div>
                          
                        </div>
                   
                </div>
            </div>
        )
    }
}

function mapStateToProps({events, attendance, profile, auth, info }){
    return {
      attendance: attendance,
      events: events,
      profile : profile,
      auth: auth,
      info: info
     }
  }
  
  const mapDispatchToProps = dispatch => {
    //console.log('mapdispatch to props: ', dispatch);
    return {
      // init: (e) => {
      //   dispatch(fetchUser())
      //   .then(() => fetchUserProfile())
      //   .then(() => fetchEvents())
      //   .then(() => checkAttendance())
      // },
      editUserProfile: (e) => {
        dispatch(editUserProfile(e))
        // this.forceUpdate();
      }
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);


  // <div className="nested">
                      
                    
                    
              
                 
  //             </div>