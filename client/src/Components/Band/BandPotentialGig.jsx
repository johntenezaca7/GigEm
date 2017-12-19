import React from 'react';
import ProgressComponent from '../User/ProgressComponent';
import { connect } from 'react-redux';

class BandPotentialGig extends React.Component {
  constructor(props) {
      super(props);
      this.state = {};
  }

  renderLocation(gig) {
    if (!gig.city && !gig.state) {
      return (<div>No location specified.</div>)
    } else if (gig.city && !gig.state) {
      return (<div>{gig.city}</div>)
    } else if (!gig.city && gig.state) {
      return (<div>{gig.state}</div>)
    } else if (gig.city && gig.state) {
      return (<div>{gig.city}, {gig.state}</div>)
    }
  }

  renderGig(gig) {
    return (
            <div className="container m-5" key={gig.id} >
                <div className="row">
                    <div className="col-2 col-md-autoalign-self-start">
                      <h6>{gig.name}</h6><br />
                      {this.props.info.name}<br />
                      <div className="text-primary">{'$'}{gig.commits} committed of minimum {'$'}{gig.minCommits ? gig.minCommits : 1}</div>
                    </div>
                    <div className="col-8 justify-content-md-center">
                      <ProgressComponent percent={gig.commits / gig.minCommits} /> 
                      ({`${(Math.min(gig.commits / (gig.minCommits ? gig.minCommits : 1)) * 100)}% committed.`})
                    </div>
                    <div className="col-2 col-md-auto">
                      {this.renderLocation(gig)}
                      {`${(new Date(gig.finalCommitDate)).getMonth() + 1} / ${(new Date(gig.finalCommitDate)).getDate()} /
                        ${(new Date(gig.finalCommitDate)).getFullYear()}`}<br />
                    </div>
                    </div>
                </div>

        )
    }

  render() {
    return (
      <div>
        {this.props.events
          .filter((x) => x.UserId === this.props.info.id && x.currentCommitValue <= x.minCommitValue)
          .map((x) => this.renderGig(x))}
      </div>
    )}
}


function mapStateToProps({ events, auth, attendance, info, users }){
  return { 
    attendance: attendance,
    events: events,
    auth: auth,
    info: info, 
    users: users
  }
}
  
export default connect(mapStateToProps, null)(BandPotentialGig);