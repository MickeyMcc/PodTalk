/* jshint esversion: 6 */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const SearchForm = props => (
  <Paper
    rounded={false}
    zDepth={1}
    style={{
      marginTop: 10,
      marginLeft: 10,
      height: 80,
      width: 380,
      display: 'inline-block',
    }}
  >
    <TextField
      style={{ marginLeft: 10, marginTop: 15 }}
      onChange={props.enterSearch}
      hintText="Show Name"
    />
    <RaisedButton
      style={{ marginLeft: 10, marginTop: 15 }}
      onClick={props.submitSearch}
      label="Search"
    />
  </Paper>
);

SearchForm.propTypes = {
  enterSearch: PropTypes.func.isRequired,
  submitSearch: PropTypes.func.isRequired,
};

export default SearchForm;
