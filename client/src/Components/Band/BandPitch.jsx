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
  return (
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched &&
      ((error && <span>{error}</span>) ||
      (warning && <span>{warning}</span>))}
  </div>
)}


let BandPitch = props => {

const renderDate = ({ input, label, type, meta }) => {
  return (
  <div>
    <SingleDatePicker
      date={input.value}
      focused={meta.active}
      onDateChange={value => input.onChange({ value })}
      onFocusChange={({ focused }) => input.onFocus({ focused })}
      dateGrab={props.dateGrab}
    />
  </div>
)};

  return (
    <div className="container border w-75 align-self-center">
      <div className="m-1 p-0">
            <form onSubmit={props.handleSubmit} className="pitch-gig-wrapper">

            <div className="pitch-gig-left-element">
              <label>Event Name</label>
            </div>
            <div className="pitch-gig-right-element">
                  <Field
                    name="eventName"
                    component={renderField}
                    component="input"
                    type="text"
                    placeholder="Event Name"
                  />
            </div>

          <div className="pitch-gig-left-element">
            <label>Event Date</label>
          </div>
          <div className="pitch-gig-right-element">
            <Field
              name="startDate"
              component={renderDate}
              type="date"
              placeholder="Event Date"
              // normalize={normalizeDate}
              // format={formatDate}
              />
          </div>

          <div className="pitch-gig-left-element">
            <label>Event Description</label>
          </div>
          <div className="pitch-gig-right-element">
            <Field
              name="eventDescription"
              component="input"
              type="text"
              placeholder="Describe your event.. "
            />
          </div>

          <div className="pitch-gig-left-element">
            <label>No venue for event yet?</label>
          </div>
          <div className="pitch-gig-right-element">
            <Field name="hasNoVenue" id="hasNoVenue" component="input" type="checkbox"/>
          </div>

          <div className="pitch-gig-left-element">
            <label>Venue</label>
          </div>
          <div className="pitch-gig-right-element">
                  <Field
                    name="venueName"
                    component="input"
                    label="Venue Name"
                    type="text"
                    placeholder="My Garage "
                  />
          </div>

          <div className="pitch-gig-left-element">
            <label>Venue Description</label>
          </div>
          <div className="pitch-gig-right-element">
                  <Field
                    name="venueDescription"
                    component="textarea"
                    label="Venue Description"
                    type="text"
                    placeholder="My Garage "
                  />
          </div>

          <div className="pitch-gig-left-element">
            <label>Show start time</label>
          </div>
          <div className="pitch-gig-right-element">
            <Field
              name="startTime"
              component="input"
              type="text"
              label="Show Starts"
              placeholder="8:00 PM"
            />
          </div>

          <div className="pitch-gig-left-element">
            <label>Venue Address</label>
          </div>
          <div className="pitch-gig-right-element">
                  <Field
                    name="address"
                    component="input"
                    label="Venue Street Address"
                    type="text"
                    placeholder="123 Road St"
                  />
          </div>

          <div className="pitch-gig-left-element">
            <label>City</label>
          </div>
          <div className="pitch-gig-right-element">

                  <Field
                    name="city"
                    component="input"
                    label="City"
                    type="text"
                    placeholder="New York "
                  />
          </div>

          <div className="pitch-gig-left-element">
            <label>State</label>
          </div>
          <div className="pitch-gig-right-element">
                  <Field
                    name="state"
                    component="input"
                    type="text"
                    label="State"
                    placeholder="NY"
                  />
          </div>

          <div className="pitch-gig-left-element">
            <label>Zip Code</label>
          </div>
          <div className="pitch-gig-right-element">

                  <Field
                    name="zip"
                    component="input"
                    type="integer"
                    label="Zip Code"
                    placeholder="12345"
                  />

          </div>

          <div className="pitch-gig-left-element">
          <label htmlFor="isCommitted">Check Box If Your Event Already Confirmed</label>
          </div>
          <div className="pitch-gig-right-element">
                  <Field name="isCommitted" id="isCommitted" component="input" type="checkbox"/>
          </div>

          <div className="pitch-gig-left-element">
          Minimum Commitment to Have Event
          </div>
          <div className="pitch-gig-right-element">
                  <Field
                    name="minCommits"
                    component="input"
                    type="integer"
                    placeholder="10"
                    label="Minimum Commitment to Have the Event"
                  />
          </div>
          
          <div className="pitch-gig-left-element">
            <label>Suggested Commitment</label>
          </div>
          <div className="pitch-gig-right-element">
                  <Field
                    name="price"
                    component="input"
                    type="integer"
                    placeholder="5"
                    label="Suggested Commitment"
                  />
          </div>

          <div className="pitch-gig-left-element">
            <label>Mobile number for text updates</label>
          </div>
          <div className="pitch-gig-right-element">

                  <Field
                    name="phone"
                    component="input"
                    type="string"
                    placeholder="512-920-8543"
                    label="Do you want us to send you text updates on the event? If so, add a phone number."
                  />
          </div>

          <div className="pitch-gig-center-element">
                <button type="submit" className="btn btn-primary">Submit</button>
          </div>
            </form>
          </div> 
        </div>


  )
} 

BandPitch = reduxForm({
  form: 'pitchGigForm'
  // validate
})(BandPitch);

export default BandPitch;
