import React from 'react';
import GigText from './GigText';

import { connect } from 'react-redux';
import { /* fetchUser, fetchUserProfile,*/ fetchEvents, checkAttendance, editUserProfile } from '../../actions/index';

<<<<<<< HEAD
import { /* RIEToggle, */ RIEInput /*, RIETextArea, RIENumber, RIETags, RIESelect */} from 'riek';
import _ from 'lodash';
=======
import { /* RIEToggle, */ RIEInput, RIETextArea, /*RIENumber, RIETags, RIESelect */} from 'riek'
import _ from 'lodash'
>>>>>>> navbarBranch

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }

    componentWillMount() {
      this.props.init();
    }


<<<<<<< HEAD
      console.log('userProfile props:PROFILE ', this.props);
=======
    renderProfileType() {
      console.log('renderProfileType this.props', this.props);
      if (this.props.profile.isBand) {
        return (`Band`)
      } else {
        return (`User`)
      }
    }

    render() {
      // console.log('userProfile props: ', this.props);
>>>>>>> navbarBranch
        return (
          <div>
            <div className="alert alert-primary text-center" role="alert">
              <div>
                Edit your profile by clicking on the text fields!
              </div>
            </div>
<<<<<<< HEAD
                <div className="userProfile-wrapper">
                      <div className="nested">
                        <div>
                          <div>
                                <RIEInput 
                                value={ this.props.info.name || 'No username!'}
                                change={(e) => this.props.editUserProfile(e)}
                                propName='name'
                                validate={_.isString} />
                                <img src="./Assets/userLogo.svg" width="200px" height="200px" alt="Bandname"/>  
                                
                            </div>
                            <div>
                                <RIEInput 
                                  value={this.props.profile.city || 'city'} 
                                  change={(e) => this.props.editUserProfile(e)}
                                  propName='city'
                                  validate={_.isString} />,
                            </div>
                            <div>
                                <RIEInput 
                                  value={this.props.profile.state || 'state'}
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
                    <div>
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
=======
                <div className="row">
                  {/* <div className="col col-1">
                  </div> */}
                  <div className="col col-3">
                    <div><h1 className="display-4">
                    User Profile - <RIEInput 
                        value={this.props.profile.name || 'No username!'}
                        change={(e) => this.props.editUserProfile(e)}
                        propName='name'
                        validate={_.isString} /></h1></div>
                      <div className="lead">
                      Profile Type - {this.renderProfileType()}
                      </div>
                      <div className="container mx-auto m-3">
                        <img src="./Assets/userLogo.svg" width="200px" height="200px" alt="Bandname"/>
                      </div>
                      <h3><RIEInput 
                        value={this.props.profile.email || 'No email'}
                        change={(e) => this.props.editUserProfile(e)}
                        propName='email'
                        validate={_.isString} /></h3>
                        
                        <h2>
                          <div className="row">
                          <div className="col col-md-auto">
                            <RIEInput 
                              value={this.props.profile.city || 'city'}
                              change={(e) => this.props.editUserProfile(e)}
                              propName='city'
                              validate={_.isString} />,
                          </div>
                          <div className="col col-md-auto">
                            <RIEInput
                              value={this.props.profile.state || 'state.'}
                              change={(e) => this.props.editUserProfile(e)}
                              propName='state'
                              validate={_.isString} />
                          </div>
                          </div>
                        </h2>
                      <div className="col col-md-auto">
                      <h3>Upcoming Shows</h3>
                        {this.props.events
                          .filter((x) => x.isCommitted === true)
                          .filter((x) => this.props.attendance.includes(x.id))
                          .map((x) => <GigText user={this.props.auth.id} key={x.id} gig={x} usercommitted={this.props.attendance.includes(x.id)}/>)
                        }
>>>>>>> navbarBranch
                        <h3>Potential Gigs</h3>
                        {this.props.events
                          .filter((x) => x.isCommitted === false)
                          .filter((x) => this.props.attendance.includes(x.id))
                          .map((x) => <GigText user={this.props.auth.id} key={x.id} gig={x} usercommitted={this.props.attendance.includes(x.id)}/>)
                        }
                      </div>
                      
                    </div>
<<<<<<< HEAD
                   
                </div>
=======
                  <div className="col-5 m-5">
                  <RIETextArea
                    value={this.props.profile.description || 'Write your description here!'}
                    change={(e) => this.props.editUserProfile(e)}
                    propName='description'
                    validate={_.isString} />
                  </div>
              </div>

              <div className="alert alert-warning text-center" role="alert">
              <div>
              <button className="btn btn-success my-2 my-sm-0" onClick={(e) => this.props.editUserProfile({'isBand': true})}>
                Change User Type to Band
              </button>
              </div>
              </div>
>>>>>>> navbarBranch
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
      init: (e) => {
      //   dispatch(fetchUser())
      //   .then(() => fetchUserProfile())
      //   .then(() => 
      dispatch(fetchEvents())
      dispatch(checkAttendance())
      },
      //   
      // },
      editUserProfile: (e) => {
        // console.log(e);
        dispatch(editUserProfile(e))
        // this.forceUpdate();
      }
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);


  // <div className="nested">
                      
                    
                    
              
                 
  //             </div>