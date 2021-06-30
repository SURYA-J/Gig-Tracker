import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const GigListItem = ({ id, companyName, perDiem, date }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{companyName}</h3>
      <span className="list-item__sub-title">{moment(date).format('MMMM Do, YYYY')}</span>
    </div>
    <h3 className="list-item__data">{perDiem}</h3>
  </Link>
);

export default GigListItem;
