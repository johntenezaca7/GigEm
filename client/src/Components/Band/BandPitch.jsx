import React from 'react';
import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';
// import ProgressComponent from './ProgressComponent';
import Datetime from 'react-datetime';

import * as actions from '../../actions'
// import { networkInterfaces } from 'os';


class BandPitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user: '',
          getFunc: '',
          fetched: false,
          temp: "",
          
        };
    }


    
    // componentWillReceiveProps(nextProps){
    //   if (nextProps.user !== "" && this.state.temp !== nextProps.user) {
    //     console.log("SIDUBVIWEUBIVEWUYGBYEIUWY")
    //     this.props.fetchUserProfile(nextProps.user);
    //     this.setState({
    //       temp: nextProps.user
    //     })
    //   }
    // }

    validateGigForm() {
      console.log('LET ME VALIDATE YOU');
    };

    handleChange(e) {
      this.setState({temp: e.target.temp})
    }

    handleSubmit(e) {
      e.preventDefault();
      console.log("SUBMITTED SHOWCASE: ", this.state.temp)
    }
        
        render() {      
      
        
        return (
            <div className="container container-fluid border p-3 small" >
                <div className="row">
                {/* <div className="container-fluid border p-3 small"> */}
                    <div className="col-sm">
                      <form onSubmit={this.handleSubmit.bind(this)} >
                      <div>
                        <label>First Name</label>
                        <div>
                          <Field
                            name="firstName"
                            component="input"
                            type="text"
                            placeholder="First Name"
                          />
                        </div>
                      </div>
                      <div>
                        <button type="submit" >Submit</button>
                      </div>
                      </form>
                        <div className="form-inline">
                          {/* <div className="col col-md-auto"> */}
                          <div>
                            <label className="text-left">Location</label>
                          </div>
                          {/* </div> */}
                          {/* <div className="col "> */}
                          
                            <input type="email" className="form-control mt-1 form-control-sm justify-content-end" 
                            id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={this.state.temp.email} />
                          {/* </div> */}
                        </div>
                        <div className="form-inline">
                          {/* <div className="col col-md-auto"> */}
                            <label >Available Dates</label>
                          {/* </div> */}
                          {/* <div className="col"> */}
                            <Datetime />
                          {/* </div> */}
                        </div>
                        <div className="form-inline ">
                          {/* <div className="col col-md-auto"> */}
                          <label>Notes</label>
                            <input type="email" className="form-control mt-1 form-control-sm  justify-content-end" 
                            id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>

                    </div>
                    <div className="col-sm text-right">
                        <div className="form-inline">
                            {/* <div className="col col-6"> */}
                              <label className="text-left">Commits Needed</label>
                            {/* </div> */}
                            {/* <div className="col"> */}
                              <input type="email" className="form-control mt-1 form-control-sm justify-content-right" 
                              id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            {/* </div> */}
                        </div>
                        <div className="form-inline">
                          {/* <div className="col"> */}
                            <label>By</label>
                            {/* <div className="col align-self-end text-right"> */}
                            <Datetime />
                          {/* </div> */}
                        </div>
                        <div className="button-block">
                          <button type="submit" className ="btn btn-secondary">Submit</button>
                        </div>
                    </div>
                </div> 
              </div>
            // </div>

        )
    } 
}

BandPitch = reduxForm({
  form: 'pitchGigForm'
  // fields: ['name', 'description','photo','startDate' ,'endDate','startTime','finalCommitDate','city','state','zip','price','minCommits','bandId','venueId','venueName'],
  // validate: validateGigForm
})(BandPitch);

function mapStateToProps(state) {
  // console.log('REDUCERS STATES IN BADPITCH:', state)
  return {
    auth: state.auth,
    userInfo: state.info
  }
}

// BandPitch = reduxForm({
//   form: 'pitchGigForm'
//   // fields: ['name', 'description','photo','startDate' ,'endDate','startTime','finalCommitDate','city','state','zip','price','minCommits','bandId','venueId','venueName'],
//   // validate: validateGigForm
// })(BandPitch);

export default  connect(mapStateToProps, actions)(BandPitch);