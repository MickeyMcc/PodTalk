const initialState = {
  user: '',
  currentShows: [],
};

/*  
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
    case 'SEARCH':
      newVids = search(action.identifier)
      return Object.assign({}, state, {currentPage: 'search'}, {currentShows: newVids});
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

export default reducer;