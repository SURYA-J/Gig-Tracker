const gigsReducerDefaultState = [];

export default (state = gigsReducerDefaultState, action) => {
  switch (action.type) {
    case 'POPULATE_STORE':
      return [...state,...action.gigs]

    case 'ADD_GIG':
      return [
        ...state,
        ...action.gig
      ];
    // case 'REMOVE_GIG':
    //   return state.filter(({ id }) => id !== action.id);
    case 'EDIT_GIG':
      return state.map((gig) => {
        if (gig.id === action.id) {
          return {
            ...gig,
            ...action.updates
          };
        } else {
          return gig;
        };
      });
    default:
      return state;
  }
};
