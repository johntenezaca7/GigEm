import React from 'react';
import ProgressComponent from './ProgressComponent';
import Modal from 'react-modal';
import {
  Link
} from 'react-router-dom'
import {
  connect
} from 'react-redux';
import {
  payForEvent,
  commitToEvent,
  uncommitFromEvent,
  fetchEvents,
  checkAttendance,
  saveEventPhoto
} from '../../actions/index';
import ShowcaseInfo from '../ShowDescription';
import Payment from '../Payment';

import firebase from '../../fireB/firebase';
import FileUploader from 'react-firebase-file-uploader';


var database = firebase.database();

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};


class UpcomingGig extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      changed: false,
      modalIsOpen: false,
      value: '',
      // usercommitment: this.props.userAttendance[0] ? this.props.userAttendance[0].commitValue : 0
    };
    this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  deletePic(e) {
      let infos = {};
      infos.photo = ''; // set to template image
      infos.id = this.props.gig.id;
      this.props.saveTheEventPhoto(infos)
    }

  handleUploadStart = () => this.setState({
    isUploading: true,
    progress: 0
  });

  handleProgress = (progress) => this.setState({
    progress
  });

  handleUploadError = (error) => {
    this.setState({
      isUploading: false
    });
    console.error(error);
  }

  handleUploadSuccess = (gig, filename) => {
    console.log("IN HANDLE UPLOAD: ", gig)
    console.log("IN HANDLE FILENAME: ", filename)

    this.setState({
      avatar: filename,
      progress: 100,
      isUploading: false
    });

    firebase.storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => {
        console.log("PROPPPPPS FB: ", this.props);
        console.log("GIG IN FB: ", gig.id);
        database.ref()
          .child('events')
          .child(gig.id)
          .set({
            eventId: gig.id,
            url: url
          });
        let infos = {};
        infos.photo = url;
        infos.id = gig.id;
        this.props.saveTheEventPhoto(infos)
        this.setState({
          avatarURL: url
        });

      })
  };

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  componentWillReceiveProps() {
    if (!this.state.changed) {
      this.setState({
        usercommitment: this.props.userAttendance && this.props.userAttendance[
            0] ?
          this.props.userAttendance[0].commitValue : 0,
        isPaid: this.props.userAttendance && this.props.userAttendance[
            0] ?
          this.props.userAttendance[0].isPaid : 0,
      });
    }
  }

  renderCommitmentForm() {
    // console.log('renderCommitmentForm this.state:', this.state)
    if (!this.props.usercommitment && !this.state.usercommitment) {
      return (
        <form>
                    <input id="commits" 
                        type="number"
                        defaultValue={this.state.value}
                        onChange={(e) => {
                            this.setState({formvalue: e.target.value})
                        }} />
                    {this.renderButton()}
                </form>
      )
    } else if (!this.state.isPaid) {
      return (
        <div> 
                    <div>
                        {`User commitment: $ ${this.props.usercommitment ? this.props.usercommitment : this.state.usercommitment}`}
                    </div>
                    <div>
                        <Payment pitchValue={this.props.usercommitment ? this.props.usercommitment : this.state.usercommitment}/>
                        <button type="button" onClick={(e) => this.payButton(e, this.props.info, this.props.gig)} className="btn btn-sm btn-primary">(test payment)</button>
                    </div>
                    <div>
                        {this.renderButton('committed')}
                    </div>
                </div>
      )
    } else if (this.state.isPaid) {
      return (
        <div> 
              <div>
                  <h5>{`Paid ${`$`}${this.state.usercommitment}`}</h5>
              </div>
            </div>
      )
    }
  };


  renderButton(status) {
    if (status !== 'committed') {
      return (
        <div className="m-1">
                        <button type="submit" 
                            key={this.props.gig.id}
                            className="pitch-button"
                            onClick={(e) => {
                                this.handleSubmit(e)} }>
                            Pitch In
                        </button>
                    </div>
      )
    } else {
      return (
        <div className="m-1">
                        <button
                            className="pitch-button"
                            onClick={(e) => {
                                this.handleSubmit(e)} }>
                            Not Going!
                        </button>
                    </div>
      )
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.usercommitment) {
      this.uncommitButton(e, this.props.info.id, this.props.gig.id, this.state
        .usercommitment)
    } else {
      this.commitButton(e, this.props.info.id, this.props.gig.id, this.state
        .formvalue);
    }
  }

  payButton(e, user, gig) {
    e.preventDefault();
    this.props.onPayClick(user, gig)
    this.setState({
      isPaid: true,
      changed: true
    })
  }

  commitButton(e, user, gig, amount) {
    this.props.onCommitClick(user, gig, amount)
    this.setState({
      usercommitment: parseInt(amount, 10) ? parseInt(amount, 10) : 0,
      usercommitted: true,
      changed: true
    })
  }

  uncommitButton(e, user, gig) {
    this.props.onUncommitClick(user, gig, this.state.usercommitment)
    this.setState({
      usercommitment: 0,
      usercommitted: false,
      changed: true
    })
  }

  render() {
    if (this.props.users.length > 0) {
      return (

        <div className="border border-dark m-2">
          <div className="potential-gig-wrapper p-2">

            <div className="potential-gig-band-name">
              <Link to={`/bandprofile/${this.props.gig.UserId}`}>
                <h4>{this.props.users.filter((x) => x.id === this.props.gig.UserId)[0].name}</h4>
                {/* {this.props.gig.UserId} */}
              </Link>
              <div>
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Example Modal">
                  <button onClick={this.closeModal}>
                    close
                  </button>
                  <ShowcaseInfo showId={this.props.gig.id} />
                </Modal>
              </div>
            </div>

            <a>
              <h4 className="potential-gig-event-name" onClick={this.openModal}>
                {this.props.gig.name}
              </h4>
            </a>

            <div className="potential-gig-venue">
              { Array.isArray(this.props.venues) &&
                this.props.venues.filter((x) => x.id === this.props.gig.VenueId)[0] &&
                this.props.venues.filter((x) => x.id === this.props.gig.VenueId)[0].name ? 
                this.props.venues.filter((x) => x.id === this.props.gig.VenueId)[0].name :
                'Venue NA'}<br />
              {this.props.gig.startTime ? `Doors @ ${this.props.gig.startTime}` : 'Start time NA'}
            </div>

            <div className="potential-gig-img">
              {this.avatarURL ?
                <img src={this.avatarURL} className="potential-gig-image" alt="Epic." /> :
                <img src={this.props.gig.photo} className="potential-gig-image" alt="Event."/>  
              }          
              <form className="p-1">
                { (this.props.gig.UserId === this.props.info.id) ? 
                  <FileUploader
                    accept="image/*"
                    name= "avatar"
                    gig={this.props.gig}
                    randomizeFilename
                    storageRef={firebase.storage().ref('images')}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess.bind(this,this.props.gig)}
                    onProgress={this.handleProgress}
              /> : ''} 
              { (this.props.gig.UserId === this.props.info.id) ? 
              <button className="btn btn-primary btn-sm" onClick={(e) => this.deletePic(e)}>Remove</button> : ''}
              
              </form>
          </div>
            
          <div className="text-success potential-gig-commit-number">
            {/*} eslint-disable-next-line */}
            Fully Commited 🎉<br />
            {`$`}{this.props.gig.commits} of {`$`}{this.props.gig.minCommits}!
          </div>
          <div className="potential-gig-progress-bar">
            <ProgressComponent percent={Math.min((this.props.gig.commits / this.props.gig.minCommits)*100,100)} />
          </div>
          <div className="potential-gig-commit-button">
              {this.renderCommitmentForm()}
          </div>
          <div>
          </div>
        </div>
      </div>



      )
    } else {
      return (<div></div>)
    }
  }
}

function mapStateToProps({
  auth,
  attendance,
  users,
  info,
  venues
}) {
  return {
    attendance: attendance,
    auth: auth,
    users: users,
    info: info,
    venues: venues
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCommitClick: (user, gig, amount) => {
      dispatch(commitToEvent(user, gig, amount ? parseInt(amount, 10) : 0))
        .then(() => dispatch(fetchEvents()))
        .then(() => dispatch(checkAttendance()))
    },
    onUncommitClick: (user, gig, amount) => {
      dispatch(uncommitFromEvent(user, gig, amount))
        .then(() => dispatch(fetchEvents()))
        .then(() => dispatch(checkAttendance()))
    },
    onPayClick: (user, gig) => {
      dispatch(payForEvent(user, gig))
        .then(() => dispatch(fetchEvents()))
        .then(() => dispatch(checkAttendance()))
    },
    saveTheEventPhoto: (infos) => {
      dispatch(saveEventPhoto(infos))
        .then(() => dispatch(fetchEvents()))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingGig);