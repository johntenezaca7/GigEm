import React from 'react';
import ProgressComponent from '../User/ProgressComponent';
import firebase from '../../fireB/firebase';
import FileUploader from 'react-firebase-file-uploader';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

var database = firebase.database();

class BandPotentialGig extends React.Component {
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
      // this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
  }

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false});
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

    firebase.storage().ref('images')
        .child(filename).getDownloadURL()
            .then(url => {
           console.log("GIG IN FB: ", gig.id);
                 database.ref().child('events').child(gig.id).set({
                  // events: {
                    eventId : gig.id,
                    //  userId: this.props.info.googleId,
                      url: url
                      //  }
                });
                let infos = {};
                infos.photo = url;
                infos.id = gig.id;
                this.props.saveEventPhoto(infos);
                this.setState({
          avatarURL: url
                });

        })
  };

  renderLocation(gig) {
    if (!gig.city && !gig.state) {
      return (<div>No location specified.</div>)
    } else if (gig.city && !gig.state) {
      return (<div>{gig.city}</div>)
    } else if (!gig.city && gig.state) {
      return (<div>{gig.state}</div>)
    } else if (gig.city && gig.state) {
      return (<div>{gig.city}, {gig.state}</div>)
    }
  }

  renderGig(gig) {
    console.log("GIGGGGG: ", gig)
    console.log("PoGig Props:", this.props)
    return (
            <div className="container m-5" key={gig.id} >
                <div className="row">
                    <div className="col-2 col-md-autoalign-self-start">
                      <h6>{gig.name}</h6><br />
                      {this.props.info.name}<br />
                      <div className="text-primary">{'$'}{gig.commits} committed of minimum {'$'}{gig.minCommits ? gig.minCommits : 1}</div>
                    </div>
                    <div className="col-8 justify-content-md-center">
                      <ProgressComponent percent={gig.commits / gig.minCommits} /> 
                      ({`${(Math.min(gig.commits / (gig.minCommits ? gig.minCommits : 1)) * 100)}% committed.`})
                    </div>
                    <div className="col-2 col-md-auto">
                      {this.renderLocation(gig)}
                      {`${(new Date(gig.finalCommitDate)).getMonth() + 1} / ${(new Date(gig.finalCommitDate)).getDate()} /
                        ${(new Date(gig.finalCommitDate)).getFullYear()}`}<br />
                    </div>
                    </div>
                    <div>
                      <form>
                          {gig.photo ?
                              // <img src={this.avatarURL} className="user-profile-image" alt="Epic." /> :
                              // <img src={this.props.info.photo} className="user-profile-image" alt="Event image."/> 
                              <img src={gig.photo} className="user-profile-image" alt="Epic." /> :
                              <img src={gig.photo} className="user-profile-image" alt="Event image."/>  
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

        )
    }

  render() {
    return (
      <div>
        {this.props.events
          .filter((x) => x.UserId === this.props.info.id && x.currentCommitValue <= x.minCommitValue)
          .map((x) => this.renderGig(x))}
      </div>
    )}
}


function mapStateToProps({ events, auth, attendance, info, users }){
  return { 
    attendance: attendance,
    events: events,
    auth: auth,
    info: info, 
    users: users
  }
}
  
export default connect(mapStateToProps, actions)(BandPotentialGig);