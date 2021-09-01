import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import "date-fns";
import { logout } from "../actions/auth1";
import { connect } from "react-redux";

const AccountLog=(props)=> {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
const onLogout=()=>{
  props.logout()
  localStorage.clear()
}

  return (

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle fontSize='inherit' />
              <Typography className={classes.title} variant="h6" noWrap>
            {props.user}
          </Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
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
const mapStateToProps = (state) => ({
  user: state.auth.user
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});     

export default connect(mapStateToProps,mapDispatchToProps)(AccountLog);