import React from 'react';
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {selectedDateFilter} from '../actions/filters';

import { connect } from 'react-redux';
import moment from 'moment';

const CustomDatePicker=(props)=>{
    const selectedDate=moment().startOf('day')// const selectedDate=new Date()//new Date("2014-08-18T21:11:54")
   const onDateChange = (date) => {
    props.dispatch(selectedDateFilter(date.valueOf())) 
  };
  return(
    <div>
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
      <Grid container justifyContent="space-around" >
        <KeyboardDatePicker
        style={{flexBasis:"150px"}}
          disableToolbar
          margin="dense"
          variant="inline"
          format="dd/MM/yyyy"
          id="date-picker-inline"
          value={selectedDate}
          onChange={onDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />        
      </Grid>
    </MuiPickersUtilsProvider>
          </div>
  )} 

  const mapStateToProps = (state) => {
    return {
      filters: state.filters
    };
  };
  
  export default connect(mapStateToProps)(CustomDatePicker);