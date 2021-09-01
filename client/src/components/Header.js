import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles } from "@material-ui/core/styles";
import ScheduleIcon from "@material-ui/icons/Schedule";
import "date-fns";
import CustomDatePicker from'./DatePicker';
import {Link} from "react-router-dom"
import SearchGig from "./SearchGig";
import AccountLog from "./AccountLog";
import {selectedDateFilter} from '../actions/filters';
import { connect } from 'react-redux';

const Header=(props)=> {
  const classes = useStyles();
  const setDateSelectors = ()=>{
    props.dispatch(selectedDateFilter(0)) 
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background:"#2E3B55"}}>
        <Toolbar style={{width:"95%",height:"70px", left:"3%"}}>
          <ScheduleIcon />
          <Typography className={classes.title} variant="h6" noWrap component={Link} to={'/dashboard'} onClick={setDateSelectors}>
            Gig-Tracker            
          </Typography>
          <CustomDatePicker />
          <SearchGig/>
          <AccountLog/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  title: {
    flexGrow: 1,
    marginLeft: "5px",
    display: "none",
    textDecoration:"none",
    color:"White",
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
  }
}));

  const mapStateToProps = (state) => {
    return {
      filters: state.filters
    };
  };
  
  export default connect(mapStateToProps)(Header);