import React from 'react';
// import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import ProgressComponent from './ProgressComponent';
//import moment from 'moment'
//import Datetime from 'react-datetime';
// import DateRangePickerWrapper from './DateRangePickerWrapper';
import SingleDatePicker from './SingleDatePicker';

//import * as actions from '../../actions'
//import { networkInterfaces } from 'os';

// const validate = values => {
//   console.log("VALIDATE VALUES: ", values);
//   const errors = {}
//   if (!values.eventName) {
//     errors.name = 'Required'
//   } 
//   return errors
// }


const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => {
  // console.log("RENDERFIELD: input: ", input, " label: ", label, " type: ", type)
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

// const renderDates = fields => {
//   // console.log("DATESSSS ARGS: ",fields);
//   return  (
//   <div>    
//   <DateRangePickerWrapper
//   startDateFieldName="start"
//   endDateFieldName="end"
//   {...fields}
// />
// </div>
// )};
const renderDate = ({ input, label, type, meta }) => {
  return (
  <SingleDatePicker
    date={input.value}
    focused={meta.active}
    onDateChange={value => input.onChange({ value })}
    onFocusChange={({ focused }) => input.onFocus({ focused })}
    dateGrab={props.dateGrab}
  />
)};

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
                {/* <label>Select Event Start Date and End Date If Applicable</label>
                  <div className="col">
                    <Fields
                      names={['start', 'end']}
                      component={renderDates}
                      // label="Pick Event Start Date and End Date If Applicable"
                      // normalize={normalizeDates}
                      // format={formatDates}
                    />   */}
                  <label>Event Date</label>
                  <div className="col">
                    <Field
                    name="startDate"
                    component={renderDate}
                    type="date"
                    // normalize={normalizeDate}
                    // format={formatDate}
                  />
                  </div>
              </div>
              <div>
              <div className="row">
                <label>Event Description</label>
                  <Field
                    name="eventDescription"
                    component="input"
                    // label="Event Description"
                    type="text"
                    placeholder="Describe your event.. "
                  />
              </div>
              <div>
                <label htmlFor="hasNoVenue">Check box if there is NOT a planned venue for your event?</label>
                <div>
                  <Field name="hasNoVenue" id="hasNoVenue" component="input" type="checkbox"/>
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
              {/* <label>Last Day to Finalize Show</label>
              <div className="col">
                <Field
                  name="finaldate"
                  component={renderDate}
                  // normalize={normalizeDate}
                  // format={formatDate}
                />
              </div> */}
              </div >
              <div>
                <label>Venue Street Address</label>
                  <Field
                    name="address"
                    component="input"
                    // label="City"
                    type="text"
                    placeholder="123 Road St"
                  />
              </div>
              <div>
                <label>City</label>
                  <Field
                    name="city"
                    component="input"
                    // label="City"
                    type="text"
                    placeholder="New York "
                  />
              </div>
              <div>
                <label>State</label>
                  <Field
                    name="state"
                    component="input"
                    type="text"
                    placeholder="NY"
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
                <label htmlFor="isCommitted">Check Box If Your Event Already Confirmed</label>
                <div>
                  <Field name="isCommitted" id="isCommitted" component="input" type="checkbox"/>
                </div>
              </div>
              <div>
                <label>Minimum $ To Have The Event</label>
                  <Field
                    name="minCommits"
                    component="input"
                    type="integer"
                    placeholder="10"
                  />
              </div>
              <div>
                <label>Suggested Pitch In($)</label>
                  <Field
                    name="price"
                    component="input"
                    type="integer"
                    placeholder="5"
                  />
              </div>
              <div>
                <label>Want us to send you text updates on your event?
                  Add a phone number</label>
                  <Field
                    name="phone"
                    component="input"
                    type="string"
                    placeholder="512-920-8543"
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

BandPitch = reduxForm({
  form: 'pitchGigForm'
  // validate
})(BandPitch);

export default BandPitch;
