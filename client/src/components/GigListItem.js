import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const GigListItem = ({ uid, companyName, perDiem, startDate,endDate,note }) => (     
  <NavLink className="list-item" to={`/edit/${uid}`}>
    <div>
      <h3 className="list-item__title">{companyName}</h3>
      <p className="list-item__id">Id: {uid}</p>
      <span  className="list-item__sub-title">{note}</span><br/>
      <span className="list-item__sub-title-1">{moment(Number(startDate)).format('Do MMMM YYYY')} - {moment(Number(endDate)).format('Do MMMM YYYY')}</span>
      
    </div>
    <h3 className="list-item__data">₹{perDiem}</h3>
  </NavLink>
);

export default GigListItem;
