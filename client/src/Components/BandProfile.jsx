import React from 'react';

import Navbar from './Navbar'
import GigText from './User/GigText'

import { connect } from 'react-redux';
import { fetchEvents, fetchAllUsers } from '../actions/index';

class BandProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.props.init();
    }

    render() {
      // console.log(this.props);
      let selectedUser = (this.props.users.length > 1 && this.props.auth.googleId) ? this.props.users.filter((x) => x.id === this.props.match.params.bandId) : null;
      // console.log(selectedUser);
      if (selectedUser) {
        return (
            <div>
              <div>
                <Navbar />
              </div>
              <h1 className="display-4 text-center">Band Profile - {selectedUser.name}</h1>
              <div className="row">
                <div className="col-1">
                </div>
                <div className="col-2">
                  <div>
                    <div className="container mx-auto">
                    <img src="../Assets/bandLogo.svg" width="200px" height="200px" alt="Bandname"/><br />
                    </div>
                    <div>
                    {`${selectedUser.city}, ${selectedUser.state}`}
                    </div>
                    <div>
                    <h3>Upcoming Shows</h3>
                      {this.props.events
                        .filter((x) => x.isCommitted === true)
                        .map((x) => <GigText user={selectedUser.id} key={x.id} gig={x} usercommitted={this.props.attendance.includes(x.id)}/>)
                      }
                      <h3>Potential Gigs</h3>
                      {this.props.events
                        .filter((x) => x.isCommitted === false)
                        .map((x) => <GigText user={selectedUser.id} key={x.id} gig={x} usercommitted={this.props.attendance.includes(x.id)}/>)
                      }
                    </div>
                  </div>
                </div>
                <div className="col-1">
                </div>
                <div className="col-6">
                <p>Lorem ipsum dolor sit amet, eam ex saperet labores inimicus, nam stet natum dissentiet at. Odio sumo qui id, nam lorem hendrerit ei, ut dicam commodo vis. No pri natum apeirian consulatu, sed at solet option efficiantur. An ius oporteat oportere repudiandae. Te mea inani honestatis.</p>
                <p>Qui ea eripuit disputationi, ex mea eius liber. Ea wisi detracto molestiae pri, cu erat tempor sadipscing sit. Usu minim liber sadipscing in. Nisl prompta inimicus sea ea. Eam autem meliore delicatissimi ne, mea an consul electram laboramus. Ex quo aeterno electram principes.</p>
                <div className="container">
                  <h3>Video Placeholder</h3>
                  <img src="./Assets/videoPlayer.svg" align="center" width="300px" height="300px" alt="videoplayer" />
                </div>
                <div className="container">
                  <h3>Audio Placeholder</h3>
                  <img src="./Assets/videoPlayer.svg" align="center" width="300px" height="300px" alt="videoplayer" />
                </div>
                <div className="container">
                  <h3>Audio Placeholder</h3>
                  <img src="./Assets/videoPlayer.svg" align="center" width="300px" height="300px" alt="videoplayer" />
                </div>
                </div>
              </div>
            </div>
        )
      } else {
        return (<div></div>)
      }
    }
}

function mapStateToProps({ events, auth, attendance, users }){
  return { 
    attendance: attendance,
    events: events,
    auth: auth,
    users: users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: (e) => {
      dispatch(fetchEvents())
      dispatch(fetchAllUsers())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BandProfile);