import React from 'react';
// import ProgressComponent from './ProgressComponent';
import Datetime from 'react-datetime';

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
                      <div className="container-fluid border p-3 small">
                      <h6>Edit Details</h6>
                        <div className="form-inline">
                            <div className="col col-md-auto">
                            <label>Location</label>
                            </div>
                            <div className="col align-self-end text-right">
                            <input type="email" className="form-control mt-1 form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                        </div>
                        <div className="form-inline">
                        <div className="col col-md-auto">
                            <label>Date Placeholder</label>
                        </div>
                            <div className="col align-self-end text-right">
                            <Datetime />
                    </div>
                </div>
                        <div className="form-inline ">
                            <div className="col col-md-auto">
                            <label>Notes</label>
                            </div>
                            <div className="col align-self-end text-right">
                            <input type="email" className="form-control mt-1 form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                        </div>
                                <div className="button-block">
                                    <button type="submit" className="btn btn-secondary">Submit</button>
                                </div>
                      </div>
                    </div>
                    <div className="col col-md-auto align-top text-right">
                      December 12, 2017<br />
                      Park Slope Bar<br />
                      Doors @ 8pm
                    </div>
                    </div>
                </div>

        )
    } 
}
