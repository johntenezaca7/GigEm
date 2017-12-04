import React from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../actions/index';
import { editUserProfile } from '../../actions/index';

import { /* RIEToggle, */ RIEInput /*, RIETextArea, RIENumber, RIETags, RIESelect */} from 'riek'
import _ from 'lodash'

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }


    componentWillMount() {
        this.props.onFetchClick();
      }
  
      // fetch(e) {
      //   e.preventDefault();
      //   this.props.onFetchClick();
      //   // this.setState({profile: this.props.profile});
      // }

    render() {

      console.log('userProfile props: ', this.props);
        return (
          <div>
<div class="alert alert-primary text-center" role="alert">
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
                      Upcoming Shows Component Placeholder
                      <h3>Potential Gigs</h3>
                      Potential Gigs Placeholder
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

function mapStateToProps( state){
    return {

    profile : state.profile,
    
     }
  }
  
  const mapDispatchToProps = dispatch => {
    //console.log('mapdispatch to props: ', dispatch);
    return {
      onFetchClick: id => {
        //console.log('onFetchClick id: ', id)
        dispatch(fetchUserProfile())
      },
      editUserProfile: (e) => {
        dispatch(editUserProfile(e))
        // this.forceUpdate();
      }
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);