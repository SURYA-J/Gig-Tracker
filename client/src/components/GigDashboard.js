import React from "react";
import { NavLink } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import GigList from "./GigList";
import { connect } from "react-redux";
import moment from "moment";
import gigForToday from "../selectors/gigForToday";
import "date-fns";
import {saveState} from'../store/localStorage';


const today=moment().startOf('day').valueOf();
// const today=moment("2021-07-13").startOf('day').valueOf();

const GigDashboard = (props) => {
  saveState(props.user)
  let validGig=""
  if (props.todayGig==undefined) {
    validGig=""
  }else{
    validGig=props.todayGig.companyName
  }
  return(
  <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          {validGig==""?`You have no work today just goto sleep`:<div>You have to work with <span>{validGig}</span> today</div>}
        </h1>
        <div className="page-header__actions">
          <Tooltip title="Add-Gig" aria-label="add">
            <Fab color="primary" component={NavLink} to="/create">
              <AddIcon/>
            </Fab>
          </Tooltip>
          <span className="text">
          &nbsp;Add a new Gig
          </span>
        </div>
      </div>
    </div>
    <GigList />
  </div>) 
}

const mapStateToProps = (state) => {
  const user=state
  const todayGig=gigForToday(state.gigs,today)
  return {
    user,
    todayGig:todayGig[0]
  };
};

// const mapStateToProps = (state) => {
//   return {
//     gigs: state.gigs
//   };
// };

export default connect(mapStateToProps)(GigDashboard);
