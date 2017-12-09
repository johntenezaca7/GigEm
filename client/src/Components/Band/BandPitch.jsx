import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, Fields } from 'redux-form';
// import ProgressComponent from './ProgressComponent';
import moment from 'moment'
import Datetime from 'react-datetime';
import DateRangePickerWrapper from './DateRangePickerWrapper';
import SingleDatePicker from './SingleDatePicker';

import * as actions from '../../actions'
import { networkInterfaces } from 'os';

let BandPitch = props => {

const renderDates = fields => {
  console.log("DATESSSS ARGS: ",fields);
  return  (    
  <DateRangePickerWrapper
  startDateFieldName="start"
  endDateFieldName="end"
  {...fields}
/>
)};
const renderDate = ({ input, label, type, meta }) => {

  console.log("renderDate args: ", arguments)
// const renderDate = fields => (
  return (
  <SingleDatePicker
  //{...fields}
    date={input.value}
    focused={meta.active}
    onDateChange={value => input.onChange({ value })}
    onFocusChange={({ focused }) => input.onFocus({ focused })}
    dateGrab={props.dateGrab}
  />
)};
// const formatDate = (value, name) => {
// return moment(value);
// };
// const normalizeDates = (name, value) => {
// return value.format();
// };

              
  console.log('props', props)
  return (
    
    <div className="container container-fluid border p-3 small" >
        <div className="row">
          <div className="col-sm">
            <form  onSubmit={props.handleSubmit} >
            <div>
                <label>Start Date ....and...End Date</label>
                  <div className="col">
                    <Fields
                      names={['start', 'end']}
                      component={renderDates}
                      // normalize={normalizeDates}
                      // format={formatDates}
                    />  
                  </div>
              </div>
              <div>
              <label>Last Day to Finalize Show</label>
              <div className="col">
                <Field
                  name="finaldate"
                  component={renderDate}
                  // normalize={normalizeDate}
                  // format={formatDate}
                />
              </div>
              </div>
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
              <div>
                <label>Description</label>
                  <Field
                    name="eventDescription"
                    component="textarea"
                    // type="text"
                    placeholder="Describe your event.. "
                  />
              </div>
              <div>
                <label htmlFor="hasVenue">Check if there is no planned venue for your event?</label>
                <div>
                  <Field name="hasVenue" id="hasVenue" component="input" type="checkbox"/>
                </div>
              </div>
              <label>Venue Name</label>
                  <Field
                    name="venueName"
                    component="input"
                    type="text"
                    placeholder="My Garage "
                  />
              </div>
              <div>
              <label>Venue Description</label>
                  <Field
                    name="venueDescription"
                    component="textarea"
                    // type="text"
                    placeholder="My Garage "
                  />
              </div>
              <div>
                <label>Start Date</label>
                  <div className="col">
                    <Datetime />
                  </div>
              </div>
              <div>
                <label>City</label>
                  <Field
                    name="city"
                    component="input"
                    type="text"
                    placeholder="D-lon Musk "
                  />
              </div>
              <div>
                <label>State</label>
                  <Field
                    name="state"
                    component="input"
                    type="text"
                    placeholder="D-lon Musk "
                  />
              </div>
              <div>
                <label>zip code</label>
                  <Field
                    name="zip"
                    component="input"
                    type="integer"
                    placeholder="12345"
                  />
              </div>
              <div>
                <label htmlFor="isCommitted">Is Your Event Already Fully Committed</label>
                <div>
                  <Field name="isCommitted" id="isCommitted" component="input" type="checkbox"/>
                </div>
              </div>
              <div>
                <label>Minimum Attendance</label>
                  <Field
                    name="minCommits"
                    component="input"
                    type="integer"
                    placeholder="5"
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