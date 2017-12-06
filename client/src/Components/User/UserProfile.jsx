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
                <div className="row">
                  {/* <div className="col col-1">
                  </div> */}
                  <div className="col col-5 m-5 ">
                    <h1 className="display-4">
                    User Profile - <RIEInput 
                        value={this.props.profile.name || 'No username!'}
                        change={(e) => this.props.editUserProfile(e)}
                        propName='name'
                        validate={_.isString} /></h1>
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
                      <h3>Upcoming Shows</h3>
                      <div className="col col-md-auto">
                        {this.props.events
                          .filter((x) => x.isCommitted === true)
                          .filter((x) => this.props.attendance.includes(x.id))
                          .map((x) => <GigText user={this.props.auth.id} key={x.id} gig={x} usercommitted={this.props.attendance.includes(x.id)}/>)
                        }
                        <h3>Potential Gigs</h3>
                        {this.props.events
                          .filter((x) => x.isCommitted === false)
                          .filter((x) => this.props.attendance.includes(x.id))
                          .map((x) => <GigText user={this.props.auth.id} key={x.id} gig={x} usercommitted={this.props.attendance.includes(x.id)}/>)
                        }
                      </div>
                    </div>
                  <div className="col-5 m-5">
                  <RIEInput 
                    value={this.props.profile.description || 'Write your description here!'}
                    change={(e) => this.props.editUserProfile(e)}
                    propName='description'
                    validate={_.isString} />
                  </div>
              </div>
            </div>
        )
    }
}

function mapStateToProps({events, attendance, profile, auth }){
    return {
      attendance: attendance,
      events: events,
      profile : profile,
      auth: auth
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