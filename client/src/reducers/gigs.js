const gigsReducerDefaultState = [];

export default (state = gigsReducerDefaultState, action) => {
  switch (action.type) {
    case 'POPULATE_STORE':
      return [...state,...action.gigs]

    case 'ADD_GIG':
      return [...state,action.gig];
    case 'REMOVE_GIG':
      return state.filter(gig=>gig.uid!==action.id);
      case 'EDIT_GIG':
        return state.map((gig) => {
          if (gig.uid === action.uid) {
            return {
              ...gig,
              ...action.updates
            };
          } else {
            return gig;
          };
        });
      case 'LOGOUT':
        return state=[]
    default:
      return state;
  }
};
