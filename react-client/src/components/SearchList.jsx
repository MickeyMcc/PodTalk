import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import { white } from 'material-ui/styles/colors';
import SearchEntry from './SearchEntry';

const SearchList = props => (
  <Paper
    zDepth={1}
    rounded={false}
    style={{
      marginTop: 10,
      marginLeft: 10,
      width: 380,
    }}
  >
    {props.searchResults.length ?
      <List>
        <ListItem
          hoverColor={white}
          primaryText="Results"
        />
        <Divider />
        {props.searchResults.map(result => (
          <SearchEntry
            show={result}
            key={result.id}
            userID={props.userID}
            refreshUserShows={props.refreshUserShows}
          />
        ))}
      </List>
    :
      null
    }
  </Paper>
);

SearchList.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  userID: PropTypes.number.isRequired,
  refreshUserShows: PropTypes.func.isRequired,
};

export default SearchList;
