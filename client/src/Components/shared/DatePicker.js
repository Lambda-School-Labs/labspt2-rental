import React from "react";
import Calendar from "react-calendar";
import FlexRow from "../../styled-components/index";

const DatePicker = props => {
  return (
    <FlexRow>
      <Calendar onChange={props.start} value={props.startDate} />
      <Calendar onChange={props.end} value={props.endDate} />
    </FlexRow>
  );
};

export default DatePicker;
