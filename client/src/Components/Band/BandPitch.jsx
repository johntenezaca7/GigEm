import React from 'react';
import { connect } from 'react-redux';
// import ProgressComponent from './ProgressComponent';
import Datetime from 'react-datetime';
import * as actions from '../../actions'


class BandPitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user: '',
          getFunc: '',
          fetched: false,
          temp: ""
        };
        
        // this.getInfo = this.getInfo.bind(this)
    }


    // componentDidMount() {
    //   console.log("HEREEEEE", this.props);
    //   this.props.fetchUserProfile(this.props.user)
    // }

    componentWillReceiveProps(nextProps){
  
      if (nextProps.user !== "" && this.state.temp !== nextProps.user) {
        this.props.fetchUserProfile(nextProps.user);
        this.setState({
          temp: nextProps.user
        })
      }
  
    }
        
        render() {      
        
        return (
            <div className="container container-fluid border p-3 small" >
                <div className="row">
                {/* <div className="container-fluid border p-3 small"> */}
                    <div className="col-sm">
                        <div className="form-inline">
                          {/* <div className="col col-md-auto"> */}
                          <div>
                            <label className="text-left">Location</label>
                          </div>
                          {/* </div> */}
                          {/* <div className="col "> */}
                          
                            <input type="email" className="form-control mt-1 form-control-sm justify-content-end" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
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
                            <input type="email" className="form-control mt-1 form-control-sm  justify-content-end" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>

                    </div>
                    <div className="col-sm text-right">
                        <div className="form-inline">
                            {/* <div className="col col-6"> */}
                              <label className="text-left">Commits Needed</label>
                            {/* </div> */}
                            {/* <div className="col"> */}
                              <input type="email" className="form-control mt-1 form-control-sm justify-content-right" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
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

function mapStateToProps(state) {
  console.log('REDUCERS STATES IN BADPITC:', state)
  return {
    auth: state.auth,
    userInfo: state.profile
  }
}

export default  connect(mapStateToProps, actions)(BandPitch);