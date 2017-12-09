import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import React from 'react';
import { SingleDatePicker, /*START_DATE, END_DATE */ } from 'react-dates';

class SingleDatePickerWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        focused: false,
        date: null,
      };
  
      this.onDateChange = this.onDateChange.bind(this);
      this.onFocusChange = this.onFocusChange.bind(this);
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      if (nextState.date === this.state.date &&
        nextState.focused === this.state.focused) {
        return false;
      }
  
      return true;
    }
  
    onDateChange(date) {
      console.log("the date changed: ", date)
      this.props.dateGrab(date);
      this.setState({ date: date });
    }
  
    onFocusChange({ focused }) {
      console.log("the focus changed: ", focused)      
      this.setState({ focused });
    }
  
    render() {
      const { focused, date } = this.state;
      console.log("SINGLE PROPS: ", this.props)
      console.log("SINGLE STATE: ", this.state)
      
  
      return (
        <SingleDatePicker
          id="date_input"
          date={date}
          focused={focused}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
        />
      );
    }
  }
  
  export default SingleDatePickerWrapper;