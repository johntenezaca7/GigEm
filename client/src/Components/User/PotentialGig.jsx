import React from 'react';
import ProgressComponent from './ProgressComponent';

import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { commitToEvent, uncommitFromEvent, fetchAllUsers } from '../../actions/index';


class PotentialGig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commits: this.props.gig.commits,
            usercommitted: this.props.usercommitted
        }
        this.props.init();
    }

    renderButton() {
        // console.log('PotentialGig.jsx this.props in renderButton() method')
        // console.log(this.props); 
        if (!this.state.usercommitted) {
            return (<div><button className="btn btn-info my-2 my-sm-0" onClick={(e) => this.commitButton(e, this.props.info.id, this.props.gig.id)}>Commit</button></div>)
        } else if (this.state.usercommitted) {
            return (<div><button className="btn btn-warning my-2 my-sm-0" onClick={(e) => this.uncommitButton(e, this.props.info.id, this.props.gig.id)}>Uncommit</button></div>)
        }
    }

    commitButton(e, user, gig) {
        // e.preventDefault();
        this.props.onCommitClick(user, gig)
        this.setState({commits: this.state.commits + 1})
        this.setState({usercommitted: !this.state.usercommitted});
    }

    uncommitButton(e, user, gig) {
        this.props.onUncommitClick(user, gig)
        this.setState({commits: this.state.commits - 1});
        this.setState({usercommitted: !this.state.usercommitted});
    }

    render() {
                if (this.props.users.length > 0) {
            let percent = ((this.state.commits / this.props.gig.min_commits)*100);
            return (
                <div className="container border p-3 ">
                    <div className="row">
                        <div className="col-2 align-self-start">
                        <Link to={`/bandprofile/${this.props.gig.id}`}>
                                <h3>{this.props.users.filter((x) => x.id = this.props.gig.id)[0].name}</h3>
                            </Link>
                        <Link to={`/showdetails/${this.props.gig.id}`}>
                        {this.props.gig.name}<br />
                    </Link><br />
                        <div className="text-success">{this.state.commits} of {this.props.gig.min_commits} commits!</div>
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
                </div>)
        } else {
            return(<div></div>)
        }
    } 
}

function mapStateToProps({ auth, attendance, users, info }){
    return { 
      attendance: attendance,
      auth: auth, 
      users: users,
      info: info
    }
  }

const mapDispatchToProps = dispatch => {
    //console.log('mapdispatch to props: ', dispatch);
    return {
        init: (e) => {
            dispatch(fetchAllUsers())
        },
      onCommitClick: (user, gig) => {
        //console.log('onFetchClick id: ', id)
        dispatch(commitToEvent(user, gig))
      },
      onUncommitClick: (user, gig) => {
        dispatch(uncommitFromEvent(user, gig))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PotentialGig);