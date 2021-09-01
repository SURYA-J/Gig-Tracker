// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  selectedDate: 0
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SET_DATE_FILTER':
      return {
        ...state,
        selectedDate:action.selectedDate
      };
    default:
      return state;
  }
};
