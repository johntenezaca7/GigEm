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
            <a href="/auth/google">Login With Google</a>
            </div>
          );
        default:
          return[
                    <Link to="/myshows">
                          <button className="btn btn-primary my-2 my-sm-0" type="submit">My Shows</button>
                        </Link>
                      ,
            <div key="1">
              <a href="/api/logout" >LogOut</a>
            </div>
          )
      }
    }
    
    render() {
      console.log('Inside Navbar:' + JSON.stringify(this.props));
        return (
            <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
              {/* <a className="navbar-brand">Navbar</a> */}
              <img src="./Assets/userLogo.svg" width="40px" height="40px" alt="User Logo" />
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link">
                    <h1>Username</h1>
                    <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link">Link</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Dropdown
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item">Action</a>
                      <a className="dropdown-item">Another action</a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item">Something else here</a>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled">Disabled</a>
                  </li>
                </ul>
                {/* <form className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> */} 
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
                      <Link to="/profile">
                        <button className="btn btn-danger my-2 my-sm-0" type="submit">My Profile (bands only)</button>
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
    return { auth }
}

export default  connect(mapStateToProps)(Navbar);

