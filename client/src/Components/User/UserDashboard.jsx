import React from 'react';
import { connect } from 'react-redux';
import { fetchEvents, checkAttendance, fetchAllUsers} from '../../actions/index';
import Map from './GoogleMaps';
import UpcomingGig from './UpcomingGig';
import firebase from '../../fireB/firebase';
import axios from 'axios';
import moment from 'moment';
const database = firebase.database();



class UserDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      show: false,
      dashNav: 'upcoming',
      input:'',
      logs: [],
    };
    this.changeState = this.changeState.bind(this);
    this.onClick = this.onClick.bind(this);
    this.props.init();

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderLogs = this.renderLogs.bind(this);

  }
  componentDidMount() {
    if (this.props.events) {
      this.props.events.map((place, id) => {
        return axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${place.address},%20NY%2010017&key=AIzaSyCn1886_Sxx7XVDi4xAjhKCKigLJyoxtvU`
          )
          .then(res => this.state.locations.push([res.data.results[0].geometry
            .location, place, {
              showInfo: false
            }
          ]))
      });
    }

    database.ref(`messages/`).on('value', (snapshot) => {
            const currentMessages = snapshot.val();

            if(currentMessages !== null){
                this.setState({
                    logs: currentMessages})
            }
        });
  }

 renderLogs(){
   const timeSent = moment().startOf('second').fromNow();   
  return this.state.logs.map( (blob, ix) => {
          return( <div key={ix} className="each-text"> <h4>{blob.username}: <strong>{blob.text}</strong></h4> <p>{timeSent}</p>  </div>)    
    })
  }
  

  onClick(obj) {
    this.setState({
      dashNav: obj.value
    })
    this.props.init();
  }


  onChange(event){
        this.setState({
            input: event.target.value
        })
    }

  onSubmit(event){
      event.preventDefault();
      const firstName = this.props.info.name.split(' ')[0]
      
      
      const mesid = this.state.logs.length || 1
      const nextMessage = {
          id: mesid,
          username: firstName,
          text: this.state.input, 
          createdAt: Date.now()
      }
      const ref = `messages/${nextMessage.id}` || `messages/1` 

      database.ref(ref).set(nextMessage);
  
      this.setState({
          input:''
      });    

  }

  changeState(info) {
    this.setState({
      show: true
    })
  }

  renderContent() {
    switch (this.state.dashNav) {
      case 'upcoming':
        return (
          <div>        
            <div className="user-show-scroll">
              {this.props.events
                .filter((x) => ( (x.commits >= x.minCommits) || x.isCommitted  ))
                .map((gig) => <UpcomingGig 
                                user={this.props.info.id} 
                                key={gig.id} 
                                userAttendance=
                                {Array.isArray(this.props.attendance) ?  
                                  this.props.attendance.filter((x) => 
                                    x.ShowcaseId === gig.id && x.UserId === this.props.info.id) 
                                  : [{}]
                                }
                                gig={gig}/>)
               }
             </div>
          </div>
        );
      case 'potential':
        return (
          <div>     
              <div className="user-show-scroll">
                { this.props.events
                .filter((x) => x.commits < x.minCommits)
                .map((gig) => <UpcomingGig 
                              user={this.props.info.id} 
                              key={gig.id} 
                              userAttendance=
                                {Array.isArray(this.props.attendance) ?  
                                  this.props.attendance.filter((x) => 
                                    x.ShowcaseId === gig.id && x.UserId === this.props.info.id) 
                                  : [{}]
                                }
                              gig={gig}/>)
                 }
              </div>       
            </div>
        );
      case 'chat':
        return (
          <div className="com-board"> 
                         <div className="chat-box">
                        <div className="chat-content">
                            { this.state.logs[0] ?
                            <div>New User</div> :
                            this.renderLogs()
                            }
                            <div id="new-texts" ref={() => {
                                                    const elm = document.getElementById('new-texts');
                                                    elm.scrollIntoView(true);
                                                           }}>
                            </div>
                            
                        </div>
                       
                    
                    
                    
                        <form onSubmit={this.onSubmit}>
                                <input type="text" className="message-input" placeholder="Write message here!" value={this.state.input} onChange={this.onChange}/>
                                <button type="submit" className="message-submit">Send</button>
                        </form>
                
               </div>
            </div>
        );
      default:
        return;
    }
  }

  render() {
    return (
      <div className="user-dashboard">   
        <div className="user-dashboard-leftcolumn">
          <div className="nav nav-tabs user-dashboard-nav justify-content-center"> 
            <li className="nav-item">
              <a className={this.state.dashNav === 'upcoming' ? `nav-link active` : `nav-link`} href="#upcoming" onClick={() => this.onClick({value: 'upcoming'})}>Upcoming Gigs</a>
            </li>
            <li className="nav-item">
              <a className={this.state.dashNav === 'potential' ? `nav-link active` : `nav-link`} href="#potential" onClick={() => this.onClick({value: 'potential'})}>Potential Gigs</a>
            </li>
            <li className="nav-item">
              <a className={this.state.dashNav === 'chat' ? `nav-link active` : `nav-link`} href="#chat" onClick={() => this.onClick({value: 'chat'})}>Community Board</a>
            </li>
          </div>
          <div className="user-dashboard-content">
          <br/>
            {this.renderContent()}
          </div>
        </div>
          <div className="google-maps">
              <Map
                show={this.changeState}
                geoLoc={this.state.locations}  
                center={{lat:40.728199 , lng:-73.9894738}}
                containerElement={<div style={{ height: `auto` }} />}
                mapElement={<div style={{ height: `100%`}}/>}   
              />  
            </div>
          </div>
    )
  }
}

function mapStateToProps({
  attendance,
  events,
  info
}) {
  return {
    attendance: attendance,
    events: events,
    info: info,
    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(fetchEvents())
        .then(() => dispatch(checkAttendance()))
        .then(() => dispatch(fetchAllUsers()))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);