import Axios from "axios";
import uuid from "uuid";

const fetchGigsSuccess = (gigs) => ({
  type: "POPULATE_STORE",
  gigs,
});

export const fetchGigs = (user) => {
  let newData = [];
  let finalGigs = [];
  return (dispatch) => {
    return Axios.get(`http://localhost:3002/show/${user}`).then((response) => {
      if(response.data){
      newData = response.data.map((n) => Object.assign({}, n));
      newData.map((new_obj1) => {
        const {
          0: uid,
          1: companyName,
          2: note,
          3: perDiem,
          4: startDate,
          5: endDate,
        } = { ...new_obj1 };
        const new_obj = Object.assign(
          {},
          {
            uid,
            companyName,
            note,
            perDiem,
            startDate,
            endDate,
          }
        );
        finalGigs.push(new_obj);
      }),
        dispatch(fetchGigsSuccess(finalGigs));
    }
    });
  };
};

export const addGig = (gig) => ({
  type: "ADD_GIG",
  gig,
});

export const startAddGig = (gigData = {}) => {
  return (dispatch) => {
    const {
      uid = uuid(),
      companyName = "",
      note = "",
      perDiem = 0,
      startDate = 0,
      endDate = 0,
    } = gigData;
    const gig = { uid, companyName, note, perDiem, startDate, endDate };
    return Axios.post(`http://localhost:3002/create/${gigData.user}`, gig)
      .then(dispatch(addGig(gig)))
      .then(console.log(gig));
  };
};

//edit gig
const editGigUpdate=(uid, updates) => ({
  type: 'EDIT_GIG',
  uid,
  updates
});



export const editGig = (id,gigData = {}) => {
  return (dispatch) => {
    const uid=id;
    const {
      companyName = "",
      note = "",
      perDiem = 0,
      startDate = 0,
      endDate = 0,
    } = gigData;
    const gig = { uid, companyName, note, perDiem, startDate, endDate };
    return Axios.post(`http://localhost:3002/edit/${gigData.user}`, gig)
      .then(dispatch(editGigUpdate(uid,gig)))
  };
};

// REMOVE_Gig

const removeGigFrom = (id) => ({
  type: "REMOVE_GIG",
  id,
});

export const removeGig = ({ id,user } = {}) => {
  return (dispatch) => {
    return Axios.delete(`http://localhost:3002/delete/${user}/${id}`).then(
      dispatch(removeGigFrom(id))
    );
  };
};
