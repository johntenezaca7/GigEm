import React, { Component } from 'react';
import firebase from '../fireB/firebase';
import FileUploader from 'react-firebase-file-uploader';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

var database = firebase.database();


class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            avatar: '', 
            isUploading: false,
            progress: 0,
            avatarURL: ''
        }
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleUploadStart = this.handleUploadStart.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleUploadError = this.handleUploadError.bind(this);
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    }

  handleChangeUsername = (event) => this.setState({username: event.target.value});
  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
      
    this.setState({
        avatar: filename, 
        progress: 100, 
        isUploading: false
    });

    firebase.storage().ref('images')
        .child(filename).getDownloadURL()
            .then(url => {
           
                 database.ref().set({
                  name: {
                     userId: this.props.info.googleId,
                      url: url
                       }
                });
                this.props.savePhoto(url);
                this.setState({
                    avatarURL: url
                });

        })
  };




  render() {
    // console.log('actions', this.props)
    return (
      <div>
        <form>
             {this.state.avatarURL ?
                    <img src={this.state.avatarURL} className="user-profile-image" /> :
                <img src={this.props.info.photo} className="user-profile-image"/>  
             }          

          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref('images')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps({info}){
    return { 
      info: info,
    }
}


export default connect(mapStateToProps, actions)(ProfilePage);