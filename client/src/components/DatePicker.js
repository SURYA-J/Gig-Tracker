// import * as React from 'react';
// import TextField from '@material-ui/core/TextField';
// import DateRangePicker from '@material-ui/lab/DateRangePicker';
// import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
// import Box from '@material-ui/core/Box';

// export default function BasicDateRangePicker() {
//   const [value, setValue] = React.useState([null, null]);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <DateRangePicker
//         startText="Check-in"
//         endText="Check-out"
//         value={value}
//         onChange={(newValue) => {
//           setValue(newValue);
//         }}
//         renderInput={(startProps, endProps) => (
//           <React.Fragment>
//             <TextField {...startProps} />
//             <Box sx={{ mx: 2 }}> to </Box>
//             <TextField {...endProps} />
//           </React.Fragment>
//         )}
//       />
//     </LocalizationProvider>
//   );
// }
import React from 'react';
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";



export default DatePicker=>{
    const [selectedDate, setSelectedDate] = React.useState(
    new Date()//new Date("2014-08-18T21:11:54")
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
        style={{flexBasis:"150px"}}
          disableToolbar
          margin="dense"
          variant="inline"
          format="dd/MM/yyyy"
          id="date-picker-inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />        
      </Grid>
    </MuiPickersUtilsProvider>
  )} 