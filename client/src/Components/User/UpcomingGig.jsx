import React from 'react';
import ProgressComponent from './ProgressComponent';

import {
    // BrowserRouter as Router,
    // Route,
    Link
  } from 'react-router-dom'


import { connect } from 'react-redux';
import { commitToEvent, uncommitFromEvent } from '../../actions/index';

class UpcomingGig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usercommitted: this.props.usercommitted
        };
    }

    renderButton() {
        console.log('PotentialGig.jsx this.props in renderButton() method')
        console.log(this.props); 
        if (!this.state.usercommitted) {
            return (
                <div>
                    <button className="btn btn-info my-2 my-sm-0" onClick={(e) => this.commitButton(e, this.props.auth.id, this.props.gig.id)}>
                        Commit
                    </button>
                </div>)
        } else if (this.state.usercommitted) {
            return (<div><button className="btn btn-warning my-2 my-sm-0" onClick={(e) => this.uncommitButton(e, this.props.auth.id, this.props.gig.id)}>Uncommit</button></div>)
        }
    }
    
    commitButton(e, user, gig) {
        // e.preventDefault();
        this.props.onCommitClick(user, gig)
        this.setState({usercommitted: !this.state.usercommitted});
    }

    uncommitButton(e, user, gig) {
        this.props.onUncommitClick(user, gig)
        this.setState({usercommitted: !this.state.usercommitted});
    }

    render() {
        // console.log('Upcoming Gig this.props: ', this.props);
        return (
            <div className="container border p-3" key={this.props.gig.id}>
                <div className="row">
                    <div className="col-2 align-self-start">
                    <Link to={`/showdetails/${this.props.gig.id}`}>
                      {this.props.gig.name}<br />
                    </Link>
                      {this.props.gig.city}<br />
                      Fully Commited 🎉
                    </div>
                    <div className="col-lg-5 justify-content-md-center">
                      <ProgressComponent percent={100} />
                    </div>
                    <div className="col col-md-auto align-self-end" align="right">
                      {/* {this.props.gig.final_commit_date}<br /> */}
                      {/* {this.props.gig.venue_id}<br /> */}
                      Venue Placeholder<br />
                      Doors @ {this.props.gig.start_time}
                    </div>
                    <div className="col col-md-auto align-self-right content-align-right">
                        {this.renderButton()}
                    </div>
                    </div>
                </div>

        )
    } 
}

function mapStateToProps({ auth, attendance }){
    return { 
      attendance: attendance,
      auth: auth
    }
  }


const mapDispatchToProps = dispatch => {
    //console.log('mapdispatch to props: ', dispatch);
    return {
      onCommitClick: (user, gig) => {
        //console.log('onFetchClick id: ', id)
        dispatch(commitToEvent(user, gig))
      },
      onUncommitClick: (user, gig) => {
        dispatch(uncommitFromEvent(user, gig))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingGig);