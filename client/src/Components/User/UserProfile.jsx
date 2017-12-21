import React from 'react';
import UpcomingGig from './UpcomingGig';
import { connect } from 'react-redux';
import { fetchUserProfile, fetchEvents, checkAttendance, editUserProfile } from '../../actions/index';
import { RIEInput, RIETextArea } from 'riek';
import _ from 'lodash'
import Profile from '../Band/ProfileImage';
// eslint-disable-next-line
import Modal from 'react-modal';


class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modalIsOpen: false,
          userNav: 'upcoming',
        }
        this.openModal = this.openModal.bind(this);
        this.onClick = this.onClick.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.props.init();
    }


    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    componentDidMount() {
      this.props.init();
     
    }

    onClick(obj) {
    this.setState({
      userNav: obj.value
    })
    this.props.init();
  }

    renderContent(){
      let userAttendance = Array.isArray(this.props.attendance) && this.props.attendance.length > 0 ? 
        this.props.attendance
        .filter((x) => x.UserId === this.props.info.id) 
        .map((x) => x = x.ShowcaseId) : [];


      switch(this.state.userNav){
        case 'upcoming':
        return(<div>
                 <div className="inside-wall">
                    <div className="user-show-scroll">
                  
                      {this.props.events
                        .filter((x) => userAttendance.includes(x.id) && x.commits >= x.minCommits)
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
              </div>);
        case 'potential':
        return(<div>
               <div className="inside-wall">
                    <div className="user-show-scroll">
                      {this.props.events
                        .filter((x) => userAttendance.includes(x.id) && x.commits < x.minCommits)
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
                </div>);
             default:
              return;
      }
    }

    renderProfileType() {
      if (this.props.info.isBand) {
        return (`Gig'em Band`);
      } else {
        return (`Gig'em User`);
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

      if(this.props.info){
        return (
          <div>
            <div className="userProfile-wrapper"> 
                 <div className="user-side-bar nested">
                      <div>
                        <div>
                          <RIEInput 
                          value={this.props.info.name || 'No username!'}
                          change={(e) => this.props.editUserProfile(e)}
                          propName='name'
                          validate={_.isString} />
                        </div>
                        <div>
                          {this.renderProfileType()}
                        </div>
                        <div>
                         <Profile photo={this.props.info.photo} profileUser={this.props.info}/>
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
                  <div className="user-dashboard-leftcolumn">
                    <div className="nav nav-tabs user-dashboard-nav justify-content-center"> 
                      <li className="nav-item">
                        <a className={this.state.userNav === 'upcoming' ? `nav-link active` : `nav-link`} href="#upcoming" onClick={() => this.onClick({value: 'upcoming'})}>Upcoming Gigs</a>
                      </li>
                      <li className="nav-item">
                        <a className={this.state.userNav === 'potential' ? `nav-link active` : `nav-link`} href="#potential" onClick={() => this.onClick({value: 'potential'})}>Potential Gigs</a>
                      </li>
                    </div>
                    <div className="user-dashboard-content">
                      {this.renderContent()} 
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
      info: info,
      // events: events
     }
  }
  
  const mapDispatchToProps = dispatch => {
 
    return {
      init: () => {
        dispatch(fetchEvents())
        .then(() => dispatch(checkAttendance()))
      },
      editUserProfile: (e) => {
        dispatch(editUserProfile(e))
        .then(() => dispatch(fetchUserProfile()))
      }
    ,
    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

