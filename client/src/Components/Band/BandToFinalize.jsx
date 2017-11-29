import React from 'react';
// import ProgressComponent from './ProgressComponent';
import Datetime from 'react-datetime';

export default class BandToFinalize extends React.Component {
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
                      December 12, 2017<br />
                      to December 17, 2017
                    </div>
                    <div className="col-lg-8 justify-content-md-center">
                      <div className="container-fluid border p-3 small">
                      <h6>Edit Details</h6>
                        <div className="form-inline">
                            <div className="col col-md-auto">
                            <label for="exampleInputEmail1">Location</label>
                            </div>
                            <div className="col align-self-end text-right">
                            <input type="email" className="form-control mt-1 form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                        </div>
                        <div className="form-inline">
                        <div className="col col-md-auto">
                            <label for="exampleInputEmail1">Date Placeholder</label>
                        </div>



                            <div className="col align-self-end text-right">
                            <Datetime />
                    </div>
                </div>
                        <div className="form-inline ">
                            <div className="col col-md-auto">
                            <label for="exampleInputEmail1">Notes</label>
                            </div>
                            <div className="col align-self-end text-right">
                            <input type="email" class="form-control mt-1 form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                        </div>
                                <div className="button-block">
                                    <button type="submit" class="btn btn-secondary">Submit</button>
                                </div>
                      </div>
                    </div>
                    </div>
                </div>

        )
    } 
}
