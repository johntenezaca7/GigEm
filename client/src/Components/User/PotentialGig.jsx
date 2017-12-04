import React from 'react';
import ProgressComponent from './ProgressComponent';
import axios from 'axios';

export default class PotentialGig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            committed: 'not committed!'
        }
    }

    updateEvent(e) {
        console.log('potentialgig: ', e);
        console.log('gig id: ', this.props.gig.id);
        console.log('user id: ', this.props.user);
        axios.post('/api/commit', {'user': this.props.user, 'gig': this.props.gig.id} ).then(this.setState({}))
    }

    checkAttendances(e) {
        axios.post('/api/commitCheck', {'user': this.props.user, 'gig': this.props.gig.id} )
        .then((data) => {
            console.log('check attendances return data: ', data.data)
            if (data.data) {
                this.setState({committed: 'committed'})
            } else {
                this.setState({committed: 'not committed!' })
            }
        })
    }

    componentWillMount() {
        this.checkAttendances();
    }

    render() {
        console.log('potentialGig props: ', this.props);
        let percent = ((this.props.gig.commits / this.props.gig.min_commits)*100);
        return (
            <div className="container border p-3 ">
                <div className="row">
                    <div className="col-2 align-self-start">
                        {this.props.gig.name}<br />
                      
                      <div className="text-primary">{this.props.gig.commits} of {this.props.gig.min_commits} commits!</div>
                    </div>
                    <div className="col-lg-7 justify-content-md-center">
                      <ProgressComponent percent={percent} />
                    </div>
                    <div className="col-1 col-md-auto" align="right">
                        {this.props.gig.city}<br />
                      {this.props.gig.start_date} to<br />
                      {this.props.gig.end_date}
                    </div>
                    <div className="col-1 col-md-auto align-self-end" align="right">
                        <div>{this.state.committed}</div>
                        <div><button className="btn btn-info my-2 my-sm-0" onClick={this.updateEvent.bind(this)}>Commit</button></div>
                    </div>
                </div>
            </div>

        )
    } 
}
