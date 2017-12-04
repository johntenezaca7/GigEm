import React from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../actions/index';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentWillMount() {
        this.props.onFetchClick();
      }
  
      fetchEvents(e) {
        e.preventDefault();
        this.props.onFetchClick();
      }

    render() {
      console.log('userProfile props: ', this.props);
        return (
            <div>
              <div className="row">
                <div className="col-1">
                </div>
                <div className="col-6">
                  <h1 className="display-4">User Profile - {this.props.profile.name}</h1>
                    <div className="container mx-auto">
                      <img src="./Assets/userLogo.svg" width="200px" height="200px" alt="Bandname"/>
                    </div>
                    <h3>{this.props.profile.email}</h3>
                    Upcoming Shows Component Placeholder
                    <h3>Potential Gigs</h3>
                    Potential Gigs Placeholder
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
      }
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);