import React from 'react';
import {  ShareButtons, ShareCounts, generateShareIcon } from 'react-share';
// import ProgressComponent from './ProgressComponent';

import { connect } from 'react-redux';
import { commitToEvent, uncommitFromEvent } from '../../actions/index';

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const WhatsappIcon = generateShareIcon('whatsapp');
const GooglePlusIcon = generateShareIcon('google');
const RedditIcon = generateShareIcon('reddit');
const TumblrIcon = generateShareIcon('tumblr');


class GigText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commits: this.props.gig.commits,
            usercommitted: this.props.usercommitted
        }
    }

    renderButton() {
        // console.log('PotentialGig.jsx this.props in renderButton() method')
        // console.log(this.props); 
        if (!this.state.usercommitted) {
            return (<div><button className="btn btn-danger btn-sm" onClick={(e) => this.commitButton(e, this.props.auth.id, this.props.gig.id)}>Recommit</button></div>)
        } else if (this.state.usercommitted) {
            return (<div><button className="btn btn-warning btn-sm" onClick={(e) => this.uncommitButton(e, this.props.auth.id, this.props.gig.id)}>Uncommit</button></div>)
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
        // console.log('GigText.jsx props in render() method: ', this.props);
        // console.log('potentialGig state: ', this.state);
        // let percent = ((this.state.commits / this.props.gig.min_commits)*100);
       
        return (
            <div>
                <div className="gig-text-wrapper">
                    <div>
                        {this.props.gig.name}<br />
                      <div className="text-primary">{this.props.gig.commits} of {this.props.gig.min_commits} commits!</div>
                    </div>
                    <div>
                        {this.props.gig.city}<br />
                        Daterange placeholder<br />
                      {/* {this.props.gig.start_date} to<br />
                      {this.props.gig.end_date} */}
                    </div>
                    <div>
                        {this.renderButton()}
                    </div>
                    <div>
                      Share this event!
                      <div className="social-media">
                         <FacebookIcon size={32} round={true} />
                         <TwitterIcon size={32} round={true} /> 
                         <GooglePlusIcon size={32} round={true}/> 
                         <WhatsappIcon size={32} round={true} />
                         <RedditIcon size={32} round={true} />
                         <TumblrIcon size={32} round={true} />
                      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GigText);