import React from 'react';
import ProgressComponent from './ProgressComponent';
import axios from 'axios';


export default class UpcomingGig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    commitEvent(e) {
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

    renderButton() {
        if (this.state.committed === "not committed!") {
            return (<div><button className="btn btn-info my-2 my-sm-0" onClick={this.commitEvent.bind(this)}>Commit</button></div>)
        } else {
            return (<div><button className="btn btn-warning my-2 my-sm-0" onClick={this.uncommitEvent.bind(this)}>Uncommit</button></div>)
        }
    }


    componentDidMount() {
        this.checkAttendances();
    }


    render() {
        // console.log('Upcoming Gig this.props: ', this.props);
        return (
            <div className="container border p-3" key={this.props.gig.id}>
                <div className="row">
                    <div className="col-2 align-self-start">
                      {this.props.gig.name}<br />
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
