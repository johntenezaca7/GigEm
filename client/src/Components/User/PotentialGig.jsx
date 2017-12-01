import React from 'react';
import ProgressComponent from './ProgressComponent';

export default class PotentialGig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let percent = ((this.props.gig.commits / this.props.gig.min_commits)*100);
        return (
            <div className="container border p-3 ">
                <div className="row">
                    <div className="col align-self-start">
                        {this.props.gig.name}<br />
                      
                      <div className="text-primary">{this.props.gig.commits} of {this.props.gig.min_commits} commits!</div>
                    </div>
                    <div className="col-lg-5 justify-content-md-center">
                      <ProgressComponent percent={percent} />
                    </div>
                    <div className="col col-md-auto" align="right">
                        {this.props.gig.city}<br />
                      {this.props.gig.start_date} to<br />
                      {this.props.gig.end_date}
                    </div>
                    <div className="col col-md-auto align-self-end" align="right">
                        <div>Committed /<br /> 
                        Not committed</div>
                        <div><button className="btn btn-info my-2 my-sm-0">Commit</button></div>
                    </div>
                </div>
            </div>

        )
    } 
}
