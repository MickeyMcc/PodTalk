const initialState = {
  user: '',
  currentShows: [],
  currentPage: '/'
};

/*
  To describe state mutations you have to write a pure function that takes the 
  previous state of the app and the action being dispatched, then returns the next state of the app.
  This function is called the Reducer.  
  
  Rules of a reducer:

  1. Reducers initialize state. If a reducer receives a state of undefined, it must return the initial state.
  2. If a reducer does not recognize an action, it must return the current state.
  3. A reducer is a pure function that must NOT mutate the state.
    See more on pure functions here:
      https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/01-Intro_and_3_Principles_of_Redux.md#03-pure-and-impure-functions
*/

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SHOW':
      //DATABASE ADD/CREATE
    case 'CHANGE_PAGE':
      return Object.assign({}, state, { currentPage: action.payload });
    case 'SEARCH':
      newVids = search(action.payload)
      return Object.assign({}, state, {currentPage: 'search'}, {currentShows: newVids});
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

export default reducer;