import React from 'react';
import { connect } from 'react-redux';
import GigListItem from './GigListItem';
import getVisibleGigs from '../selectors/gigs';
export const GigList = (props) => (
  <div className="content-container-2">
    <div className="list-header">
      <div className="show-for-desktop">Gigs</div>
      <div className="show-for-desktop">Per Diem</div>
    </div>
    <div className="list-body">
      {
        props.gigs.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No gigs</span>
          </div>
        ) : (
            props.gigs.map((gig) => {
              return <GigListItem key={gig.uid} {...gig} />;  
            })
          )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    gigs : getVisibleGigs(state.gigs, state.filters)
  };
};

export default connect(mapStateToProps)(GigList);
