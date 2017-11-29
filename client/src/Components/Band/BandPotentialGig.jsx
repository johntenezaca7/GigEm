import React from 'react';
import ProgressComponent from '../User/ProgressComponent';

export default class BandPotentialGig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col col-md-autoalign-self-start">
                      Clark<br />
                      <div className="text-primary">15 of 20 commits!</div>
                      <div>5 more needed by 11/31/2017!</div>
                    </div>
                    <div className="col-lg-6 justify-content-md-center">
                      <ProgressComponent percent={Math.floor(Math.random() * 100)} />
                    </div>
                    <div className="col col-md-auto align-self-end" align="right">
                      Oakland, CA<br />
                      December 12, 2017 to<br />
                      December 17, 2017
                    </div>
                    </div>
                </div>

        )
    } 
}
