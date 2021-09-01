import React from "react";
import moment from "moment";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import busyDates from "../selectors/busyDates";

class GigForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: props.gig ? props.gig.companyName : "",
      startDate: props.gig
        ? moment(Number(props.gig.startDate))
        : moment().startOf("day"),
      endDate: props.gig
        ? moment(Number(props.gig.endDate))
        : moment().startOf("day"),
      note: props.gig ? props.gig.note : "",
      perDiem: props.gig ? props.gig.perDiem.toString() : "",
      calendarFocused: false,
      edit: props.gig ? true : false,
      busyDateWithoutUnnecessary: [],
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
  onperDiemChange = (e) => {
    const perDiem = e.target.value;
    if (!perDiem || perDiem.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ perDiem }));
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
    let dummyDate = this.props.busyDate;
    dummyDate = dummyDate.map((i) => Number(i));

    if (this.state.edit) {
      let i = dummyDate.indexOf(this.props.gig.startDate);
      let j = dummyDate.indexOf(this.props.gig.endDate);
      dummyDate[i] = 0;
      dummyDate[j] = 0;
      console.log(dummyDate)
    }
    if (!this.state.companyName || !this.state.perDiem) {
      this.setState(() => ({
        error: "Please provide client company name and Per Deim.",
      }));
    } else if (
      dummyDate.includes(this.state.startDate.valueOf()) ||
      dummyDate.includes(this.state.endDate.valueOf())
    ) {
      this.setState(() => ({
        error: "You are busy on the dates provided",
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        user: this.props.user,
        companyName: this.state.companyName,
        perDiem: parseFloat(this.state.perDiem, 10),
        startDate: this.state.startDate.valueOf(),
        endDate: this.state.endDate.valueOf(),
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
            <div style={{ padding: 0, display: "inline" }}>
              <span className="text">from: </span>
              <Grid container style={{ display: "inline" }}>
                <KeyboardDatePicker
                  style={{ flexBasis: "150px", display: "inline" }}
                  disableToolbar
                  margin="dense"
                  variant="inline"
                  format="dd/MM/yyyy"
                  id="date-picker-inline1"
                  value={this.state.startDate}
                  onChange={this.onStartDateChange}
                />
              </Grid>
              <span className="text">&emsp;&emsp;&emsp;to: </span>

              <Grid container style={{ display: "inline" }}>
                <KeyboardDatePicker
                  style={{ display: "inline" }}
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
            value={this.state.perDiem}
            onChange={this.onperDiemChange}
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

const mapStateToProps = (state) => {
  const user = state.auth.uid;
  const busyDate = busyDates(state.gigs);
  return {
    busyDate,
    user,
  };
};

export default connect(mapStateToProps)(GigForm);
