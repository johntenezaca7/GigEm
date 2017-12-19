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
        return (                
        <div className="row m-3" key={gig.id}>
        <div className="col col-3 align-self-start">
          {gig.name}<br />
          {`${'$'}${gig.commits} of ${'$'}${gig.minCommits} committed!`} 🎉
        </div>
        <div className="col col-5 text-center">
          <ProgressComponent percent={Math.min((gig.commits / (gig.minCommits ? gig.minCommits : 1)) * 100,100)} /> 
                        ({`${Math.min(Math.floor((gig.commits / (gig.minCommits ? gig.minCommits : 1)) * 100),100)}% committed.`})

        </div>

        <div className="col col-2 align-top text-right">
          {`${(new Date(gig.finalCommitDate)).getMonth() + 1} / ${(new Date(gig.finalCommitDate)).getDate()} /
            ${(new Date(gig.finalCommitDate)).getFullYear()}`}<br />
                          { this.props.venues.filter((x) => x.id === this.props.gig.VenueId)[0] &&
                            this.props.venues.filter((x) => x.id === this.props.gig.VenueId)[0].name ? 
                            this.props.venues.filter((x) => x.id === this.props.gig.VenueId)[0].name :
                            'Venue NA'}<br />
          {gig.startTime ? `Doors @ ${gig.startTime}` : 'Start time NA'}
        </div>
        </div>)
    }

    render() {
      console.log('band upcoming gig props: ', this.props);
        if (this.props.events && !this.props.potential) {
          return (
              <div className="container m-5">
                {this.props.events.filter((x) => (x.UserId === this.props.info.id && x.commits > x.minCommits/* this.id && x.isCommitted === true */ ))
                // .forEach((x) => console.log(x))
                .map((x) => this.renderIndividualUpcomingGig(x))
                }    
              </div>
          )
        } else if (this.props.events && this.props.potential) {
          return (
              <div className="container m-5">
                {this.props.events.filter((x) => (x.UserId === this.props.info.id && x.commits <= x.minCommits/* this.id && x.isCommitted === true */ ))
                // .forEach((x) => console.log(x))
                .map((x) => this.renderIndividualUpcomingGig(x))
                }    
              </div>
          )
        } else { return(<div></div>)}
    } 
}


function mapStateToProps({ auth, events, info, venues }) {
    return {
      auth: auth,
      events: events,
      info: info,
      venues: venues
    }
  }
  
  
  export default connect(mapStateToProps)(UpcomingGig);