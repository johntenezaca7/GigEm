import React from 'react';

import Navbar from './Navbar'
import PotentialGig from './User/PotentialGig'
import UpcomingGig from './User/UpcomingGig'

import { connect } from 'react-redux';
import { fetchEvents, fetchAllUsers, editUserProfile, fetchUserProfile } from '../actions/index';

class BandProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    
    }

    render() {
      console.log('bandprofile props: ', this.props);
      console.log('matched url user: ', parseInt(this.props.match.params.bandId,10))
      var selectedUser = this.props.users.filter((x) => x.id === parseInt(this.props.match.params.bandId,10))[0];
      if (!selectedUser && !this.props.user) selectedUser = {id: -1}
      let eventsCommitMap = this.props.events
        .filter((x) => x.isCommitted === true && x.UserId === selectedUser.id)
      let eventsPotentialMap = this.props.events
        .filter((x) => x.isCommitted === false && x.UserId === selectedUser.id)
      console.log('selectedUser: ', selectedUser);
      console.log('events potential map: ', eventsPotentialMap)

      if (selectedUser) {
        return (
            <div>
              <div>
                <Navbar />
              </div>
                <div className="bandProfile-wrapper">
                    <div>
                    </div>
                    <div className="bandContent-wrapper ">
                        <div>
                          <h4>Band Profile - {selectedUser.name}</h4>
                            <img src="../Assets/bandLogo.svg" className="grid-image" alt="Bandname"/><br />
                            <div>
                            {`${selectedUser.city}, ${selectedUser.state}`}
                            </div>
                            <div className="border border-dark p-1">
                              <p>Lorem ipsum dolor sit amet, eam ex saperet labores inimicus, nam stet natum dissentiet at. Odio sumo qui id, nam lorem hendrerit ei, ut dicam commodo vis. No pri natum apeirian consulatu, sed at solet option efficiantur. An ius oporteat oportere repudiandae. Te mea inani honestatis.</p>
                              <p>Qui ea eripuit disputationi, ex mea eius liber. Ea wisi detracto molestiae pri, cu erat tempor sadipscing sit. Usu minim liber sadipscing in. Nisl prompta inimicus sea ea. Eam autem meliore delicatissimi ne, mea an consul electram laboramus. Ex quo aeterno electram principes.</p>
                            </div>
                        </div>
                         <div>
                            <h3>Upcoming Shows</h3>
                              <div className="band-show-scroll border border-dark m-2">
                                { eventsCommitMap
                                  .map((x) => <UpcomingGig user={selectedUser.id} key={x.id} gig={x} usercommitted={this.props.attendance.includes(x.id)}/>)
                                }
                              </div>
                            <h3>Potential Gigs</h3>
                            <div className="band-show-scroll border border-dark m-2">
                                { eventsPotentialMap
                                  .map((x) => <PotentialGig user={selectedUser.id} key={x.id} gig={x} usercommitted={this.props.attendance.includes(x.id)}/>)
                                } */}
                              </div>
                            </div>
                          <div className="band-media">
                              <h3>Video Placeholder</h3>
                              <div className="side-scrolling border border-dark text-center">
                                <img src="../Assets/videoPlayer.svg" className="grid-image" alt="videoplayer" />
                            
                                <img src="../Assets/videoPlayer.svg" className="grid-image" alt="videoplayer" />
          
                                <img src="../Assets/videoPlayer.svg" className="grid-image" alt="videoplayer" />
                              </div>
                          </div>
                          
                        </div>
                        <div>

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
    },
    editUserProfile: (e) => {
      dispatch(editUserProfile(e))
      .then(() => dispatch(fetchUserProfile()))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BandProfile);