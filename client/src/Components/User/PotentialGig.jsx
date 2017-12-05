import React from 'react';
import ProgressComponent from './ProgressComponent';
// import axios from 'axios';

import { connect } from 'react-redux';
import { commitToEvent, uncommitFromEvent, checkAttendance } from '../../actions/index';


class PotentialGig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commits: this.props.gig.commits
        }
    }

    renderButton() {
        console.log('render button this.state: ', this.state);
        console.log('render button props: ', this.props);
        if (this.state.committed === "not committed!") {
            return (<div><button className="btn btn-info my-2 my-sm-0" onClick={(e) => this.props.onCommitClick(this.props.user, this.props.gig.id)}>Commit</button></div>)
        } else {
            return (<div><button className="btn btn-warning my-2 my-sm-0" onClick={(e) => this.props.onUncommitClick(this.props.user, this.props.gig.id)}>Uncommit</button></div>)
        }
    }

    componentWillMount() {
        this.props.checkAttendanceDispatch(this.props.user, this.props.gig.id)
    }

    render() {
        console.log('potentialGig props: ', this.props);
        console.log('potentialGig state: ', this.state);
        let percent = ((this.props.gig.commits / this.props.gig.min_commits)*100);
        return (
            <div className="container border p-3 ">
                <div className="row">
                    <div className="col-2 align-self-start">
                        {this.props.gig.name}<br />
                      <div className="text-primary">{this.state.commits} of {this.props.gig.min_commits} commits!</div>
                    </div>
                    <div className="col-lg-5 justify-content-md-center">
                      <ProgressComponent percent={percent} />
                    </div>
                    <div className="col col-md-auto" align="right">
                        {this.props.gig.city}<br />
                        Daterange placeholder<br />
                      {/* {this.props.gig.start_date} to<br />
                      {this.props.gig.end_date} */}
                    </div>
                    <div className="col-1 col-md-auto align-self-right content-align-right">
                        {this.renderButton()}
                    </div>
                </div>
            </div>

        )
    } 
}

function mapStateToProps({ events, auth }){
    return { 
      events: events,
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
      },
      checkAttendanceDispatch: (user, gig) => {
        dispatch(checkAttendance(user, gig))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PotentialGig);