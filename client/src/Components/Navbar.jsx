import React from 'react';

import {
  // BrowserRouter as Router,
  // Route,
  Link
} from 'react-router-dom'

import { connect } from 'react-redux';

class Navbar extends React.Component {
    
    renderContent(){
      switch(this.props.auth){
        case null:
          return;
        case false:
          return(
            <div>
              {/* <td> */}
                {/* <Link to="/auth/google"> */}
                <a href="/auth/google"><button className="btn btn-warning my-2 my-sm-0" type="submit">Login With Google</button></a>
                {/* </Link> */}
              {/* </td> */}
            </div>
          );
        default:
          return (
            <div>
              {/* <td> */}
                <Link to="/myshows">
                  <button className="btn btn-primary my-2 my-sm-0" type="submit">My Shows</button>
                </Link>
              {/* </td> */}
              {/* <td> */}
                {/* <Link to="/api/logout"> */}
                  <a href="/api/logout"><button className="btn btn-warning my-2 my-sm-0" type="submit">Logout</button></a>
                {/* </Link> */}
              {/* </td> */}
          </div>
          )
      }
    }
    
    render() {
      
        return (
            <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
              {/* <a className="navbar-brand">Navbar</a> */}
              <Link to="/">
                <img src="./Assets/userLogo.svg" width="40px" height="40px" alt="User Logo" />
              </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link">
                    <h1>{this.props.auth[0] ? this.props.auth[0].google_id : 'Anonymous User'}</h1>
                    <span className="sr-only">(current)</span>
                    </a>
                  </li>
                </ul>
                <table>
                  <tbody>
                    <tr>
                    <td>
                      <Link to="/band">
                        <button className="btn btn-info my-2 my-sm-0" type="submit">View Band Routes</button>
                      </Link>
                      </td>
                    <td>
                      <Link to="/bandprofile">
                        <button className="btn btn-danger my-2 my-sm-0" type="submit">Band Profile</button>
                      </Link>
                    </td>
                    <td>
                      <Link to="/userprofile">
                        <button className="btn btn-danger my-2 my-sm-0" type="submit">User Profile</button>
                      </Link>
                    </td>
                      <td>
                       {this.renderContent()}
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

function mapStateToProps({ auth }){
  //console.log('map:', auth)
    return { 
      auth: auth,
      userInFo: 'info'
    }
}

export default  connect(mapStateToProps)(Navbar);

