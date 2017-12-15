import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import React from 'react';
// eslint-disable-next-line
import { DateRangePicker, SingleDatePicker, START_DATE, END_DATE } from 'react-dates';
// import DateRangePicker from './SingleDatePicker'

class DateRangePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
    };
  }

  handleDatesChange = (dates) => {
    const startField = this.props[this.props.startDateFieldName];
    const endField = this.props[this.props.endDateFieldName];
    startField.input.onChange(dates.startDate);
    endField.input.onChange(dates.endDate);
  }

  handleFocusChange = (focusedInput) => {
    this.setState({ focusedInput });
    if (focusedInput === START_DATE) {
      this.props[this.props.startDateFieldName].input.onFocus();
      return;
    }
    if (focusedInput === END_DATE) {
      this.props[this.props.endDateFieldName].input.onFocus();
      return;
    }
  }

  render() {
      // console.log("DATE RANGE PROPS: ", this.props);
    const startDate = this.props[this.props.startDateFieldName].input.value || null;
    const endDate = this.props[this.props.endDateFieldName].input.value || null;

    return (
      <DateRangePicker
        endDate={endDate}
        endDatePlaceholderText="End Date"
        focusedInput={this.state.focusedInput || null}
        minimumNights={0}
        onDatesChange={this.handleDatesChange}
        onFocusChange={this.handleFocusChange}
        startDate={startDate}
        startDatePlaceholderText="Start Date"
        isOutsideRange={() => false}
      />
    );
  }
}
export default DateRangePickerWrapper;