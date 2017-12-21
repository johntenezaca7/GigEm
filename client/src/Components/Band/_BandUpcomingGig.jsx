import React from 'react';
import ProgressComponent from '../User/ProgressComponent';
import firebase from '../../fireB/firebase';
import FileUploader from 'react-firebase-file-uploader';
import {
  connect
} from 'react-redux';
import {
  saveEventPhoto,
  fetchEvents
} from '../../actions/index';

var database = firebase.database();

class UpcomingGig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      isUploading: false,
      progress: 0,
      avatarURL: ''
    }
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
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

  renderIndividualUpcomingGig(gig) {
    return (
      <div className="container text-center">
      <div className="row justify-content-md-center m-2 border border-dark" key={gig.id}>
        <div className="col col-2 align-self-start">
          
          {`${'$'}${gig.commits} of ${'$'}${gig.minCommits} committed!`} 🎉
        </div>
        <div className="col col-6 text-center">
        <h3>{gig.name}</h3><br />
          <ProgressComponent percent={Math.min((gig.commits / (gig.minCommits ? gig.minCommits : 1)) * 100,100)} /> 
                        ({`${Math.min(Math.floor((gig.commits / (gig.minCommits ? gig.minCommits : 1)) * 100),100)}% committed.`})

        </div>

        <div className="col col-2 align-top text-right">
        
          {`${(new Date(gig.finalCommitDate)).getMonth() + 1}/${(new Date(gig.finalCommitDate))
            .getDate()}/${(new Date(gig.finalCommitDate)).getFullYear()}`}<br />
                          { this.props.venues.filter((x) => x.id === gig.VenueId)[0] &&
                            this.props.venues.filter((x) => x.id === gig.VenueId)[0].name ? 
                            this.props.venues.filter((x) => x.id === gig.VenueId)[0].name :
                            'Venue NA'}<br />
          {gig.startTime ? `Doors @ ${gig.startTime}` : 'Start time NA'}
        </div>
        <div>
              <form>
                  {this.avatarURL ?
                      <img src={this.avatarURL} className="user-profile-image" alt="Epic." /> :
                      <img src={gig.photo} className="user-profile-image" alt="Event."/>  
                  }          

                <FileUploader
                  accept="image/*"
                  name= "avatar"
                  gig={gig}
                  randomizeFilename
                  storageRef={firebase.storage().ref('images')}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess.bind(this,gig)}
                  onProgress={this.handleProgress}
                />
              </form>
            </div>
        </div>
      </div>
    )
  }

  render() {
    if (this.props.events && !this.props.potential) {
      return (
        <div>
                {this.props.events.filter((x) => (x.UserId === this.props.info.id && x.commits > x.minCommits ))
                .map((x) => this.renderIndividualUpcomingGig(x))
                }    
              </div>
      )
    } else if (this.props.events && this.props.potential) {
      return (
        <div>
                {this.props.events.filter((x) => (x.UserId === this.props.info.id && x.commits <= x.minCommits ))
                .map((x) => this.renderIndividualUpcomingGig(x))
                }    
              </div>
      )
    } else {
      return (<div></div>)
    }
  }
}


function mapStateToProps({
  auth,
  events,
  info,
  venues
}) {
  return {
    auth: auth,
    events: events,
    info: info,
    venues: venues
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveTheEventPhoto: (infos) => {
      dispatch(saveEventPhoto(infos))
        .then(() => dispatch(fetchEvents()))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UpcomingGig);