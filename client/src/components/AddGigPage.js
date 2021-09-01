import React from "react";
import { connect } from "react-redux";
import AddGigForm from "./AddGigForm"
import { startAddGig } from "../actions/gigs";

export class AddGigPage extends React.Component {  
  onSubmit = (gig) => {
    this.props.startAddGig(gig);
    this.props.history.push("/dashboard");
  };
  render() {
    return (
      <div>
        <h1 className="page-header__title-2">Add Gig</h1>
        <AddGigForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddGig: (gig) => dispatch(startAddGig(gig))
});     

export default connect(undefined, mapDispatchToProps)(AddGigPage);
