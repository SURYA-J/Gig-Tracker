import React from "react";
import { connect } from "react-redux";
import AddGigForm from "./AddGigForm"
import { startAddGig } from "../actions/gigs";

export class AddGigPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.onSubmit = this.onSubmit.bind(this)
    console.log(props)
  }
  
  onSubmit = (gig) => {
    console.log(this.props);
    this.props.startAddGig(gig);
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <h1>Add Gig</h1>
        <AddGigForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddGig: (gig) => dispatch(startAddGig(gig))
});     

export default connect(undefined, mapDispatchToProps)(AddGigPage);
