import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";
import { Snackbar } from "@material-ui/core";
import {startLogin } from "../actions/auth1";
import { connect } from "react-redux";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      cpassword: "",
      error: "",
      redirect: false,
    };
  }
  onuserNameChange = (e) => {
    const userName = e.target.value;
    this.setState(() => ({ userName }));
  };
  oncpasswordChange = (e) => {
    const cpassword = e.target.value;
    this.setState(() => ({ cpassword }));
  };
  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };
  onpasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (
      !this.state.userName ||
      !this.state.password ||
      !this.state.cpassword ||
      !this.state.email
    ) {
      this.setState(() => ({
        error: "Please fill all fields",
      }));
    } else if (this.state.password !== this.state.cpassword) {
      this.setState(() => ({
        error: "passwords does not match",
      }));
    } else {
      this.setState(() => ({ error: "" }));
      axios
        .post("http://localhost:3002/signup", {
          userName: this.state.userName,
          email: this.state.email,
          password: this.state.password,
        }).then(this.props.startLogin(this.state.email,this.state.userName))
        .then(this.setState(() => ({ redirect: true })));
    }
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
                <form className="register_form" onSubmit={this.onSubmit}>
                  <Snackbar />
                  {this.state.error && (
                    <p className="form__error">{this.state.error}</p>
                  )}
                  <h2 className="title">Sign Up</h2>
                  <p>Please fill in this form to create an account!</p>
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
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email zmdi-hc-2x"></i>
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      name="email"
                      id="email"
                      autoComplete="off"
                      value={this.state.email}
                      onChange={this.onEmailChange}
                      placeholder="email"
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

                  <div className="form-group">
                    <label htmlFor="cpassword">
                      <i className="zmdi zmdi-lock zmdi-hc-2x"> </i>
                    </label>
                    <input
                      type="password"
                      className="form-input"
                      name="cpassword"
                      id="cpassword"
                      autoComplete="off"
                      value={this.state.cpassword}
                      onChange={this.oncpasswordChange}
                      placeholder="Confirm your Password"
                    />
                  </div>
                  <div className="form_loginbtn">
                    <button type="submit" className="form_submit">
                      Register
                    </button>
                  </div>

                </form>
              </div>
              <div className="panels-container">
              <div className="panel .right-panel">
                <div className="content">
                   <h3>One of us?</h3>
                   <NavLink to="/"><button className="form_submit" id="sign-up-btn"> Login here</button></NavLink>
                </div>
                <div id="slider">
                <div className="slides">

                  <div className="slider">
                      <img src="next_tasks.jpg" className="image" />
                 </div>
                 <div className="slider">
                      <img src="Operating.jpg" className="image" />
                 </div>
                 <div className="slider">
                      <img src="Transfer.jpg" className="image" />
                 </div>
                 <div className="slider">
                      <img src="Addtasks.jpg" className="image" />
                 </div>
                 <div className="slider">
                      <img src="Programming.jpg" className="image" />
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
  startLogin: (email,user) => dispatch(startLogin(email,user))
});     

export default connect(undefined, mapDispatchToProps)(Signup);
// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import "./Signup.css"
// const Signup = () => {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//     cpassword: "",
//   });
//   let name, value;
//   const inputInfo = (e) => {
//     console.log(e);
//     name = e.target.name;
//     value = e.target.value;
//     setUser({ ...user, [name]: value });
//   };
//   const onSubmit = (e) => {
//     e.preventDefault();
//       this.props.onSubmit({
//         userName: this.state.userName,
//         password: parseFloat(this.state.password, 10),
//         startDate: this.state.startDate.valueOf(),
//         endDate:this.state.endDate.valueOf(),
//         cpassword: this.state.cpassword,
//       });
//   };
//   return (
//     <div className="background-signup">
//       <div>
//         <div className="signup-form">
//           <div className="container">
//             <div className="signup-content">
//               <form
//                 className="register_form"
//                 action="/examples/actions/confirmation.php"
//                 method="post"
//               >
//                 <h2 className="form_title">Sign Up</h2>
//                 <p>Please fill in this form to create an account!</p>
//                 <div className="form-group">
//                   <label htmlFor="name">
//                     <i className="zmdi zmdi-account zmdi-hc-1.5x"></i>
//                   </label>
//                   <input
//                     type="name"
//                     className="form-input"
//                     name="name"
//                     id="name"
//                     autoComplete="off"
//                     value={user.name}
//                     onChange={inputInfo}
//                     placeholder="Username"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">
//                     <i className="zmdi zmdi-email zmdi-hc-2x"></i>
//                   </label>
//                   <input
//                     type="email"
//                     className="form-input"
//                     name="email"
//                     id="email"
//                     autoComplete="off"
//                     value={user.email}
//                     onChange={inputInfo}
//                     placeholder="email"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="password">
//                     <i className="zmdi zmdi-lock zmdi-hc-2x"> </i>
//                   </label>
//                   <input
//                     type="password"
//                     className="form-input"
//                     name="password"
//                     id="password"
//                     autoComplete="off"
//                     value={user.password}
//                     onChange={inputInfo}
//                     placeholder="Your Password"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="cpassword">
//                     <i className="zmdi zmdi-lock zmdi-hc-2x"> </i>
//                   </label>
//                   <input
//                     type="password"
//                     className="form-input"
//                     name="cpassword"
//                     id="cpassword"
//                     autoComplete="off"
//                     value={user.cpassword}
//                     onChange={inputInfo}
//                     placeholder="Confirm your Password"
//                   />
//                 </div>
//                 <div className="form_button">
//                   <input
//                     type="submit"
//                     name="signup"
//                     id="signup"
//                     className="form_submit"
//                     value="Register"
//                   />
//                 </div>
//                 <div className="Iamregister">
//                   Already have an account?
//                   <NavLink to="/">Login here</NavLink>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
