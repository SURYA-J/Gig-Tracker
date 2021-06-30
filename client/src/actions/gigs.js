import Axios from 'axios';
import uuid from 'uuid';

const fetchGigsSuccess=(gigs)=>(
  {
  type:'POPULATE_STORE',
  gigs
})

export const fetchGigs = () => {
  return (dispatch) => {
    return Axios.get('http://localhost:3002/show')
    .then(response => {
      dispatch(fetchGigsSuccess(response.data))
    })
}
}

export const addGig = (gig) => ({
  type: 'ADD_Gig',
  gig
});

export const startAddGig = (gigData = {}) => {
  return (dispatch) => {
    const {
      uid = uuid(),
      companyName = '',
      description = '',
      perDiem = 0,
      startDate = 0,
      endDate=0
    } = gigData;
    const gig = {uid, companyName, description, perDiem, startDate, endDate};
      return Axios.post('http://localhost:3002/create',
      gig).then((gig) => {
        console.log(gig)
        dispatch(addGig({ ...gig }))
      }).then(alert('gig added'))
  };
};

