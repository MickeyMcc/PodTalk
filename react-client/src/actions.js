/*
  The state tree is read only. Any time you want to change the state, 
  you have to dispatch an action. The action will describe the state change.
  The only requirement for an action is that it has a type property (conventionally a String).

  const action { type: 'RESET_STATE' };
  const actionWithPayload = { type: 'UPDATE_INPUT_VALUE', payload: 'Dude' };
*/

export const addShow = (show) => {
  return {
    type: 'ADD_SHOW',
    /* ES6 obect property shorthand */
    identifier: show
  }
}

export const search = (query) => ({
  type: 'SEARCH',
  identifier: query
});

export const reset = () => ({
  type: 'RESET_STATE',
});

