import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";
import { startLogin } from "../actions/auth1";
import { fetchGigs } from "../actions/gigs";
import { connect } from "react-redux";
import './Signup.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      error: "",
    };
  }
  onuserNameChange = (e) => {
    const userName = e.target.value;
    this.setState(() => ({ userName }));
  };
  onpasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3002/login", {
        userName: this.state.userName,
        password: this.state.password,
      })
      .then((response) => {
        const res = response.data;
        if (res == "error")
          this.setState({ error: "user name and password does not match" });
        else {
          this.setState(() => ({ redirect: true }))
          this.props.startLogin(res, this.state.userName)
          this.props.fetchGigs(res)
          
        };
      });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={this.onSubmit} className="register_form">
              <h2 className="title">Login</h2>
              {this.state.error && <h2 className="text-center">{this.state.error}</h2>}
              <div className="form-group">
                <label htmlFor="name">
                  <i className="zmdi zmdi-account zmdi-hc-2x"></i>
                </label>
                <input
                  type="name"
                  className="form-input"
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={this.state.userName}
                  onChange={this.onuserNameChange}
                  placeholder="Username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock zmdi-hc-2x"> </i>
                </label>
                <input
                  type="password"
                  className="form-input"
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={this.state.password}
                  onChange={this.onpasswordChange}
                  placeholder="Your Password"
                />
              </div>

              <div className="form_loginbtn">
                <button type="submit" className="form_submit">
                  Login
                </button>
              </div>

            </form>
          </div>

          <div className="panels-container">
            <div className="panel .left-panel">
              <div className="content">
                <h3>New Here?</h3>

                <NavLink to="/signup"><button className="form_submit" id="sign-up-btn">SignUp</button></NavLink>
              </div>
              <div id="slider">
                <div className="slides">

                  <div className="slider">
                    <img src="Web.jpg" className="image" />
                  </div>
                  <div className="slider">
                    <img src="qg.jpg" className="image" />
                  </div>
                  <div className="slider">
                    <img src="Addbro.jpg" className="image" />
                  </div>
                  <div className="slider">
                    <img src="j.jpg" className="image" />
                  </div>
                </div>
                <div className="switch">
                  <ul>
                    <li>
                      <div className="on"></div>
                    </li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  startLogin: (email, user) => dispatch(startLogin(email, user)),
  fetchGigs: (email) => dispatch(fetchGigs(email))
});

export default connect(undefined, mapDispatchToProps)(Login);
