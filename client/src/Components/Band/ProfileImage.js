import React, { Component } from 'react';
import firebase from '../../fireB/firebase';
import FileUploader from 'react-firebase-file-uploader';
import { connect } from 'react-redux';
import { editUserProfile, fetchAllUsers } from '../../actions/index';

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
                     userId: this.props.profileUser.googleId,
                      url: url
                       }
                });
                let changes = {};
                changes.photo = url;
                this.props.editTheUserProfile(changes);
                this.setState({
                    avatarURL: url
                });

        })
  };

  deletePic(e) {
    let infos = {};
    infos.photo = ''; // set to template image
    infos.id = this.props.info.id;
    this.props.editTheUserProfile(infos)
    this.setState({avatarURL: null});
  }

  render() {
    
    return (
      <div className="small">
      
        <form>
             {this.state.avatarURL ?
                <img src={this.state.avatarURL} className="user-profile-image p-1" alt="User profile avatar." /> :
                <img src={this.props.profileUser.photo} className="user-profile-image p-1" alt="User profile."/>  
             }          
        {this.props.profileUser.id === this.props.info.id ? 
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref('images')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          /> : ''}
        </form>
        { (this.props.profileUser.id === this.props.info.id) ? 
              <button className="btn btn-primary btn-sm" onClick={(e) => this.deletePic(e)}>Remove</button> : ''}
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    editTheUserProfile: (infos) => {
      dispatch(editUserProfile(infos))
        .then(() => dispatch(fetchAllUsers()))
    }
  }
}

function mapStateToProps({info}){
    return { 
      info: info,
    }   
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
