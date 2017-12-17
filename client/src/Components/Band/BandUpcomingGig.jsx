import React from 'react';
import ProgressComponent from '../User/ProgressComponent';
import { connect } from 'react-redux';
// import Datetime from 'react-datetime';

class UpcomingGig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    renderIndividualUpcomingGig(gig) {
        console.log(gig);
        return (                
        <div className="row" key={gig.id}>
        <div className="col align-self-start">
          {gig.name}<br />
          {`${'$'}${gig.currentCommitValue} of ${'$'}${gig.minCommitValue} committed!`} 🎉
        </div>
        <div className="col text-center">
          <ProgressComponent percent={gig.currentCommitValue / gig.minCommitValue} /> 
                        ({`${(gig.currentCommitValue / (gig.minCommitValue ? gig.minCommitValue : 1)) * 100}% committed.`})

        </div>

        <div className="col col-md-auto align-top text-right">
          {`${(new Date(gig.finalCommitDate)).getMonth() + 1} / ${(new Date(gig.finalCommitDate)).getDate()} /
            ${(new Date(gig.finalCommitDate)).getFullYear()}`}<br />
          Venue Placeholder.<br />
          Doors @ {gig.startTime ? gig.startTime : 'NA'}
        </div>
        </div>)
    }

    render() {
        // console.log('bandupcominggig props: ', this.props);
        // console.log('current user id: ', this.props.info.id);
        // console.log('bandupcoming gig state: ', this.state)
        if (this.props.events) {
          return (
              <div className="container m-5">
                {this.props.events.filter((x) => (x.UserId === this.props.info.id && x.currentCommitValue > x.minCommitValue/* this.id && x.isCommitted === true */ ))
                // .forEach((x) => console.log(x))
                .map((x) => this.renderIndividualUpcomingGig(x))
                }    
              </div>
          )
        } else { return(<div></div>)}
    } 
}


function mapStateToProps({ auth, events, info, venue }) {
    return {
      auth: auth,
      events: events,
      info: info,
      venue: venue
    }
  }
  
  
  export default connect(mapStateToProps)(UpcomingGig);