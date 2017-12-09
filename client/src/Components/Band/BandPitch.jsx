import React from 'react';
//import { connect } from 'react-redux';
import { Field, reduxForm, Fields } from 'redux-form';
// import ProgressComponent from './ProgressComponent';
import moment from 'moment'
import Datetime from 'react-datetime';
import DateRangePickerWrapper from './DateRangePickerWrapper';
import SingleDatePicker from './SingleDatePicker';

//import * as actions from '../../actions'
//import { networkInterfaces } from 'os';

const validate = values => {
  console.log("VALIDATE VALUES: ", values);
  const errors = {}
  if (!values.eventName) {
    errors.name = 'Required'
  } 
  else if (values.eventName.length < 15) {
    errors.name = 'Must be over 15 characters'
  }
  // if (!values.email) {
  //   errors.email = 'Required'
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address'
  // }
  // if (!values.age) {
  //   errors.age = 'Required'
  // } else if (isNaN(Number(values.age))) {
  //   errors.age = 'Must be a number'
  // } else if (Number(values.age) < 18) {
  //   errors.age = 'Sorry, you must be at least 18 years old'
  // }
  return errors
}

// const warn = values => {
//   const warnings = {}
//   if (values.age < 19) {
//     warnings.age = 'Hmm, you seem a bit young...'
//   }
//   return warnings
// }

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => {
  console.log("RENDERFIELD: input: ", input, " label: ", label, " type: ", type)
  return (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)}


let BandPitch = props => {

const renderDates = fields => {
  console.log("DATESSSS ARGS: ",fields);
  return  (
  <div>    
  <DateRangePickerWrapper
  startDateFieldName="start"
  endDateFieldName="end"
  {...fields}
/>
</div>
)};
const renderDate = ({ input, label, type, meta }) => {

  console.log("renderDate args: ", input)
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
            <div className="col">
                {/* <label>Event Name*</label> */}
                  <Field
                    name="eventName"
                    component={renderField}
                    // component="input"
                    type="text"
                    label="Event Name"
                    placeholder="D-lon Musk "
                  />
              </div>
              <div>
                <label>Select Event Start Date and End Date If Applicable</label>
                  <div className="col">
                    <Fields
                      names={['start', 'end']}
                      component={renderDates}
                      // label="Pick Event Start Date and End Date If Applicable"
                      // normalize={normalizeDates}
                      // format={formatDates}
                    />  
                  </div>
              </div>
              <div>
              <div>
                <label>Event Description</label>
                  <Field
                    name="eventDescription"
                    component="textarea"
                    // label="Event Description"
                    // type="text"
                    placeholder="Describe your event.. "
                  />
              </div>
              <div>
                <label htmlFor="hasVenue">Check box if there is NOT a planned venue for your event?</label>
                <div>
                  <Field name="hasVenue" id="hasVenue" component="input" type="checkbox"/>
                </div>
              </div>
              <label>Venue Name</label>
                  <Field
                    name="venueName"
                    component="input"
                    // label="Venue Name"
                    type="text"
                    placeholder="My Garage "
                  />
              </div>
              <div>
              <label>Venue Description</label>
                  <Field
                    name="venueDescription"
                    component="textarea"
                    // label="Venue Description"
                    // type="text"
                    placeholder="My Garage "
                  />
              </div>
              <div>
              <label>Show Starts</label>
                  <Field
                    name="startTime"
                    component="input"
                    type="text"
                    placeholder="8:00 PM"
                  />
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
              </div >
              <div>
                <label>City</label>
                  <Field
                    name="city"
                    component="input"
                    // label="City"
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
                    placeholder="ST"
                  />
              </div>
              <div>
                <label>Zip Code</label>
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
  form: 'pitchGigForm',
  validate
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