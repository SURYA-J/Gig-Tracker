import React from 'react';
import { connect } from 'react-redux';
import GigForm from './AddGigForm';
import {removeGig} from '../actions/gigs';
import { editGig } from '../actions/gigs';

const EditGigPage = (props) => {
  return (
    <div>
      <h1 className="page-header__title-2">Edit Gig</h1>
      <GigForm
        
        gig={props.gig.find(gig=>gig!==undefined)}
        onSubmit={(gig) => {
          const iedy=props.gig.find(gig=>gig!==undefined)
          props.dispatch(editGig(iedy.uid, gig));
          props.history.push('/dashboard');
        }}
      />
      <button className="removebutton" onClick={() => {
        const iedy=props.gig.find(gig=>gig!==undefined)
        props.dispatch(removeGig({ id: iedy.uid, user:props.user}));
        props.history.push('/dashboard');
      }}>Remove</button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    user:state.auth.uid,
    gig: state.gigs.map((gig) =>{if(gig.uid == props.match.params.id){
      return gig
    }})
  };
};

export default connect(mapStateToProps)(EditGigPage);
