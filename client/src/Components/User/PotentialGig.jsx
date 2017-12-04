import React from 'react';
import ProgressComponent from './ProgressComponent';
import axios from 'axios';

export default class PotentialGig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    commitEvent(e) {
        console.log('potentialgig: ', e);
        console.log('gig id: ', this.props.gig.id);
        console.log('user id: ', this.props.user);
        axios.post('/api/commit', {'user': this.props.user, 'gig': this.props.gig.id} ).then(this.setState({committed: 'committed!'}))
    }

    uncommitEvent(e) {
        axios.post('/api/uncommit', {'user': this.props.user, 'gig': this.props.gig.id} ).then(this.setState({committed: 'not committed!'}))
    }

    checkAttendances(e) {
        axios.post('/api/commitCheck', {'user': this.props.user, 'gig': this.props.gig.id} )
        .then((data) => {
            // console.log('check attendances return data: ', data.data)
            if (data.data) {
                // console.log('shouldve found data: ', data.data);
                this.setState({committed: 'committed'})
            } else {
                // console.log('no data found');
                this.setState({committed: 'not committed!' })
            }
        })
    }

    componentDidMount() {
        this.checkAttendances();
    }

    renderButton() {
        if (this.state.committed === "not committed!") {
            return (<div><button className="btn btn-info my-2 my-sm-0" onClick={this.commitEvent.bind(this)}>Commit</button></div>)
        } else {
            return (<div><button className="btn btn-warning my-2 my-sm-0" onClick={this.uncommitEvent.bind(this)}>Uncommit</button></div>)
        }
    }

    render() {
        // console.log('potentialGig props: ', this.props);
        console.log('potentialGig state: ', this.state);
        let percent = ((this.props.gig.commits / this.props.gig.min_commits)*100);
        return (
            <div className="container border p-3 ">
                <div className="row">
                    <div className="col-2 align-self-start">
                        {this.props.gig.name}<br />
                      
                      <div className="text-primary">{this.props.gig.commits} of {this.props.gig.min_commits} commits!</div>
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
