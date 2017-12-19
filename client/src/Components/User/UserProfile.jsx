import React from 'react';
// import PotentialGig from './PotentialGig';
import UpcomingGig from './UpcomingGig';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { /* fetchUser, */ fetchUserProfile, fetchEvents, checkAttendance, editUserProfile } from '../../actions/index';
import { /* RIEToggle, */ RIEInput, RIETextArea, /*RIENumber, RIETags, RIESelect */} from 'riek';
// import { message } from '../../actions/index'; 
import _ from 'lodash'
import Profile from '../ProfilePage';

import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
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

      let userAttendance = Array.isArray(this.props.attendance) && this.props.attendance.length > 0 ? 
        this.props.attendance
        .filter((x) => x.UserId === this.props.info.id) 
        .map((x) => x = x.ShowcaseId) : [];

        console.log('userProfile props,',this.props)
        console.log('userProfile userAttendance,',userAttendance);

      if(this.props.info){
        return (
          <div>
            <h1 className="display-2">My Profile</h1>
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
                         <Profile photo={this.props.info.photo}/>
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
                    {/* <h2> Past Shows </h2>
                    <button onClick={this.openModal}>post</button>
                    <div>
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                               >
                            <button onClick={this.closeModal}>close</button>
                          
                              <div>
                          <ul id="messages"></ul>
                          <form action="">
                            <input id="m" autocomplete="off" /><button>Send</button>
                          </form>
                        </div>
                    
                            </Modal>
                          </div> */}
                    <div className="inside-wall">
                    <h3>Upcoming Shows</h3>
                    <div className="band-show-scroll">
                      {this.props.events
                        .filter((x) => userAttendance.includes(x.id) && x.commits >= x.minCommits)
                          .map((gig) => <UpcomingGig 
                            user={this.props.info.id} 
                            key={gig.id} 
                            usercommitment=
                              {Array.isArray(this.props.attendance) && 
                                this.props.attendance.filter((x) => x.ShowcaseId === gig.id && x.UserId === this.props.info.id) &&
                                this.props.attendance.filter((x) => x.ShowcaseId === gig.id && x.UserId === this.props.info.id)[0] ? 
                                this.props.attendance.filter((x) => x.ShowcaseId === gig.id && x.UserId === this.props.info.id)[0].commitValue :
                              0}
                            gig={gig}/>)
                        }
                    </div>
                    <br />
                    <h3>Potential Gigs</h3>
                    <div className="band-show-scroll">
                      {this.props.events
                        .filter((x) => userAttendance.includes(x.id) && x.commits < x.minCommits)
                        .map((gig) => <UpcomingGig 
                          user={this.props.info.id} 
                          key={gig.id} 
                          usercommitment=
                            {Array.isArray(this.props.attendance) && 
                              this.props.attendance.filter((x) => x.ShowcaseId === gig.id && x.UserId === this.props.info.id) &&
                              this.props.attendance.filter((x) => x.ShowcaseId === gig.id && x.UserId === this.props.info.id)[0] ? 
                              this.props.attendance.filter((x) => x.ShowcaseId === gig.id && x.UserId === this.props.info.id)[0].commitValue :
                            0}
                          gig={gig}/>)
                        }
                    </div>
                </div>     
                     
                    </div>
                  </div>
                  <div>
     
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

