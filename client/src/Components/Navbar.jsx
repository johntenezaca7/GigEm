import React from 'react';

import {
  // BrowserRouter as Router,
  // Route,
  Link
} from 'react-router-dom'

import { connect } from 'react-redux';
import {  fetchUserProfile, fetchEvents, fetchAllUsers, editUserProfile } from '../actions/index';



class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      isBand : false
    }
    this.props.fetchProfile(this.props.auth);
  }
    
    renderContent(){
      switch(this.props.auth){
        case null:
          return;
        case false:
          return(
            <div>
              {/* <td> */}
                <a href="/auth/google"><button className=""type="submit">Login With Google</button></a>
            </div>
          );
        default:
          return (
            <div>
                  <a href="/api/logout"><button className="" type="submit">Logout</button></a>
          </div>
          )
      }
    }


    componentWillMount() {
      this.props.init();
    }

    renderProfileType() {
     
      if (this.props.info.isBand) {
        return (`Band`)
      } else {
    
        return (`User`)
      }
    }

    renderChangeButton() {
      if (this.props.info.isBand) {
        return (
          <Link to="/userprofile">
          <button className="" onClick={(e) => this.props.editUserProfile({'isBand': false})}>
          User Account
          </button>
          </Link>
        )
      } else {
          return (
            <Link to={`/bandprofile/${this.props.info.id}`}>
              <button className="" onClick={(e) => this.props.editUserProfile({'isBand': true})}>
              Artist Account
              </button>
            </Link>
          )
      }
    }


    render() {
     
      if (this.props.info.isBand ) {
        return (
              <div>
              <nav className="navbar navbar-expand-lg  ">
                <Link to="/">
                  <img src="../Assets/party.svg" width="40px" height="40px" alt="User Logo" />
                </Link>`
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <a className="nav-link">
                      <h2>Gig'em Band: {this.props.info.name ? this.props.info.name : "Welcome to Gig'em"} {this.props.info.id}</h2>
                      <span className="sr-only">(current)</span>
                      </a>
                    </li>
                  </ul>
                <table>
                  <tbody>
                    <tr>
                    <td>
                      <Link to="/band/upcoming">
                        <button className="" type="submit">Upcoming Gigs</button>
                      </Link>
                      <Link to="/band/potential">
                        <button className=" " type="submit">Potential Gigs</button>
                      </Link>
                      <Link to="/band/pitch">
                        <button className=" " type="submit">Pitch a Gig</button>
                      </Link>
                      <Link to={`/bandprofile/${this.props.info.id}`}>
                        <button className="" type="submit">My Profile</button>
                      </Link>
                    </td>
                      <td>
                         {this.renderContent()}
                      </td> 
                  
                      <td>
                          {this.renderChangeButton()}
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </nav>
          </div>)
        } else {
            return (
              <div>
                <nav className="navbar navbar-expand-lg ">
              
                  <Link to="/">
                    <img src="./Assets/party.svg" width="40px" height="40px" alt="User Logo" />
                  </Link>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item active">
                        <a className="nav-link">
                      
                        <h2>{this.props.info.name ? `Welcome, ${this.props.info.name}` : 'Anonymous User'}</h2>
                        <span className="sr-only">(current)</span>
                        </a>
                      </li>
                    </ul>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <Link to="/user">
                              <button className="" type="submit">Dashboard</button>
                            </Link>
                            <Link to="/userprofile">
                              <button className="" type="submit">My Profile</button>
                            </Link>
                          </td>
                          <td>
                            {this.renderContent()}
                          </td> 
                          <td>
                            {this.renderChangeButton()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </div>
              </nav>
            </div>
        )
    }
}
}
 function mapStateToProps({ auth, info, users }){
     return { 
      auth: auth,
      info: info,
      users: users
      // userInfo: 'info'
    }
}


// function mapStateToProps(state){
//   return { 
//     auth: state.auth,
//     info: state.info,
//     users: state.users
//     //userInfo: 'info'
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    fetchProfile: (googleId) => {
      dispatch(fetchUserProfile(googleId))
    },
    init: (e) => {
      dispatch(fetchEvents())
      dispatch(fetchAllUsers())
    },
    editUserProfile: (e) => {
      dispatch(editUserProfile(e))
      .then(() => dispatch(fetchUserProfile()))
    }
  }
}


export default  connect(mapStateToProps, mapDispatchToProps)(Navbar);

