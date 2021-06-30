import React from "react";
import { NavLink } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import GigList from "./GigList";

const OttDashboardPage = () => (
  <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          You have to work with <span>Company Name </span> today
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
  </div>
);
export default OttDashboardPage;
