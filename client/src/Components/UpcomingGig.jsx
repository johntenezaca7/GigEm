import React from 'react';
import ProgressComponent from './ProgressComponent';

export default class UpcomingGig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col align-self-start">
                      Clark<br />
                      Fully Commited 🎉
                    </div>
                    <div className="col-lg-8 justify-content-md-center">
                      <ProgressComponent percent={100} />
                    </div>
                    <div className="col col-md-auto align-self-end" align="right">
                      December 12, 2017<br />
                      Park Slope Bar<br />
                      Doors @ 8pm
                    </div>
                    </div>
                </div>

        )
    } 
}
