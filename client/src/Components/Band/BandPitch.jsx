import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import ProgressComponent from './ProgressComponent';
import Datetime from 'react-datetime';

import * as actions from '../../actions'
// import { networkInterfaces } from 'os';

let BandPitch = props => {
              
  console.log('props', props)
  return (
    
    <div className="container container-fluid border p-3 small" >
        <div className="row">
          <div className="col-sm">
            <form  onSubmit={props.handleSubmit} >
              <div>
                <label>Event Name</label>
                  <Field
                    name="eventName"
                    component="input"
                    type="text"
                    placeholder="D-lon Musk "
                  />
              </div>
              <div>
                <label>Venue Name</label>
                  <Field
                    name="venueName"
                    component="input"
                    type="text"
                    placeholder="My Garage "
                  />
              </div>
              <div>
                <button type="submit" >Submit</button>
              </div>
            </form>
          </div> 
        </div>
      </div>

  )
} 
//}

BandPitch = reduxForm({
  form: 'pitchGigForm'
  // fields: ['name', 'description','photo','startDate' ,'endDate','startTime','finalCommitDate','city','state','zip','price','minCommits','bandId','venueId','venueName'],
  // validate: validateGigForm
})(BandPitch);

export default BandPitch;

// class BandPitch extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           user: '',
//           getFunc: '',
//           fetched: false,
//           temp: "",
//           name: ''
          
//         };
//     }

// function mapStateToProps(state) {
//   // console.log('REDUCERS STATES IN BADPITCH:', state)
//   return {
//     auth: state.auth,
//     userInfo: state.info
//   }
// }

// const asyncValidate = (values) => {
//     return Promise.reject('errors');
  
// }

// connect(mapStateToProps, actions)(BandPitch);


// <div className="form-inline">
//                           {/* <div className="col col-md-auto"> */}
//                           <div>
//                             <label className="text-left">Location</label>
//                           </div>
//                           {/* </div> */}
//                           {/* <div className="col "> */}
                          
//                             <input type="email" className="form-control mt-1 form-control-sm justify-content-end" 
//                             id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='hi' />
//                           {/* </div> */}
//                         </div>
//                         <div className="form-inline">
//                           {/* <div className="col col-md-auto"> */}
//                             <label >Available Dates</label>
//                           {/* </div> */}
//                           {/* <div className="col"> */}
//                             <Datetime />
//                           {/* </div> */}
//                         </div>
//                         <div className="form-inline ">
//                           {/* <div className="col col-md-auto"> */}
//                           <label>Notes</label>
//                             <input type="email" className="form-control mt-1 form-control-sm  justify-content-end" 
//                             id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
//                         </div>

//                     </div>
//                     <div className="col-sm text-right">
//                         <div className="form-inline">
//                             {/* <div className="col col-6"> */}
//                               <label className="text-left">Commits Needed</label>
//                             {/* </div> */}
//                             {/* <div className="col"> */}
//                               <input type="email" className="form-control mt-1 form-control-sm justify-content-right" 
//                               id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
//                             {/* </div> */}
//                         </div>
//                         <div className="form-inline">
//                           {/* <div className="col"> */}
//                             <label>By</label>
//                             {/* <div className="col align-self-end text-right"> */}
//                             <Datetime />
//                           {/* </div> */}
//                         </div>
//                         <div className="button-block">
//                           <button type="submit" className ="btn btn-secondary">Submit</button>
//                         </div>
//                     </div>
//                 </div> 
//               </div>
//             // </div