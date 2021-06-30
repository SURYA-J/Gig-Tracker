import React from "react";
import moment from "moment";
import { DateRangePicker } from "rsuite";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: props.expense ? props.expense.companyName : "",
      startDate: props.expense ? moment(props.expense.startDate) : moment(),
      endDate: props.expense ? moment(props.expense.endDate) : moment(),
      note: props.expense ? props.expense.note : "",
      perDeim: props.expense ? (props.expense.perDeim / 100).toString() : "",
      
      calendarFocused: false,
      error: "",
    };
  }
  oncompanyNameChange = (e) => {
    const companyName = e.target.value;
    this.setState(() => ({ companyName }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onperDeimChange = (e) => {
    const perDeim = e.target.value;

    if (!perDeim || perDeim.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ perDeim }));
    }
  };

  onStartDateChange = (startDate) => {
    if (startDate) {
      this.setState(() => ({ startDate }));
    }
  };
  onEndDateChange = (endDate) => {
    if (endDate) {
      this.setState(() => ({ endDate }));
    }
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.companyName || !this.state.perDeim) {
      this.setState(() => ({
        error: "Please provide client company name and Per Deim.",
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        companyName: this.state.companyName,
        perDeim: parseFloat(this.state.perDeim, 10) * 100,
        startDate: this.state.startDate.valueOf(),
        endDate:this.state.endDate.valueOf(),
        note: this.state.note,
      });
    }
  };
  render() {
    return (
      <Container className="content-container">
        <form className="form" onSubmit={this.onSubmit}>
          {this.state.error && (
            <p className="form__error">{this.state.error}</p>
          )}
          <input
            type="text"
            placeholder="Client Company Name"
            autoFocus
            className="text-input"
            value={this.state.companyName}
            onChange={this.oncompanyNameChange}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div style={{ padding: 0 , display:"inline"}}>
            <span className="text">from:  </span>
            <Grid container style={{ display:"inline"}}>
              <KeyboardDatePicker
                style={{ flexBasis: "150px" ,display:"inline"}}
                disableToolbar
                margin="dense"
                variant="inline"
                format="dd/MM/yyyy"
                id="date-picker-inline1"
                value={this.state.startDate}
                onChange={this.onStartDateChange}
              />
            </Grid>
            <span className="text">&emsp;&emsp;&emsp;to:  </span>
            
            <Grid container style={{ display:"inline"}}>
              <KeyboardDatePicker
                style={{display:"inline"}}
                disableToolbar
                margin="dense"
                variant="inline"
                format="dd/MM/yyyy"
                id="date-picker-inline2"
                minDate={this.state.startDate}
                value={this.state.endDate}
                onChange={this.onEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            </div>
          </MuiPickersUtilsProvider>

          <input
            type="text"
            placeholder="Per Diem"
            className="text-input"
            value={this.state.perDeim}
            onChange={this.onperDeimChange}
          />
          <textarea
            placeholder="Description"
            className="textarea"
            value={this.state.note}
            onChange={this.onNoteChange}
          ></textarea>
          <div>
            <button className="button">Add Gig</button>
          </div>
        </form>
      </Container>
    );
  }
}
