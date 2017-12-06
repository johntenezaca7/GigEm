import React from 'react';
// import ProgressComponent from './ProgressComponent';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { commitToEvent, uncommitFromEvent } from '../../actions/index';


class GigText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commits: this.props.gig.commits,
            usercommitted: this.props.usercommitted
        }
    }

    renderButton() {
        console.log('GigText.jsx this.props in renderButton() method')
        console.log(this.props); 
        if (!this.state.usercommitted) {
            return (<div><button className="btn btn-danger btn-sm" onClick={(e) => this.commitButton(e, this.props.auth.id, this.props.gig.id)}>Recommit</button></div>)
        } else if (this.state.usercommitted) {
            return (<div><button className="btn btn-warning btn-sm" onClick={(e) => this.uncommitButton(e, this.props.auth.id, this.props.gig.id)}>Uncommit</button></div>)
        }
    }

    commitButton(e, user, gig) {
        // e.preventDefault();
        // e.stopPropagation();
        this.props.onCommitClick(user, gig)
        this.setState({usercommitted: !this.state.usercommitted});
    }

    uncommitButton(e, user, gig) {
        // e.preventDefault();
        // e.stopPropagation();
        this.props.onUncommitClick(user, gig)
        this.setState({usercommitted: !this.state.usercommitted});
    }

    render() {
        // console.log('GigText.jsx props in render() method: ', this.props);
        // console.log('potentialGig state: ', this.state);
        // let percent = ((this.state.commits / this.props.gig.min_commits)*100);
        return (
            <div className="container small border m-2">
                <div className="row">
                    <div className="col">
                    <Link to={`/showdetails/${this.props.gig.id}`}>
                      {this.props.gig.name}<br />
                    </Link>
                      <div className="text-success">{this.props.gig.commits} of {this.props.gig.min_commits} commits!</div>
                    </div>
                    <div className="col">
                        {`${this.props.gig.city}, ${this.props.gig.state}`}<br />
                        Daterange placeholder<br />
                      {/* {this.props.gig.start_date} to<br />
                      {this.props.gig.end_date} */}
                    </div>
                    <div className="col text-right align-self-center">
                        {this.renderButton()}
                    </div>
                </div>
            </div>

        )
    } 
}

function mapStateToProps({ auth, attendance, users }){
    return { 
      attendance: attendance,
      auth: auth,
      users: users
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

export default connect(mapStateToProps, mapDispatchToProps)(GigText);