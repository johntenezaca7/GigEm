import React from 'react';
import ProgressComponent from './ProgressComponent';


export default class UpcomingGig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        console.log('Upcoming Gig this.props: ', this.props);
        return (
            <div className="container border p-3" key={this.props.gig.id}>
                <div className="row">
                    <div className="col align-self-start">
                      {this.props.gig.band_id}<br />
                      Fully Commited 🎉
                    </div>
                    <div className="col-lg-8 justify-content-md-center">
                      <ProgressComponent percent={100} />
                    </div>
                    <div className="col col-md-auto align-self-end" align="right">
                      {this.props.gig.start_date}<br />
                      {this.props.gig.venue_id}<br />
                      Doors @ {this.props.gig.start_time}
                    </div>
                    </div>
                </div>

        )
    } 
}
