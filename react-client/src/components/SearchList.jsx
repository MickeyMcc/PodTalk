import React from 'react';
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
        {props.searchResults.map((result, index) => (
          <SearchEntry
            show={result}
            key={index}
            addShow={props.addShow}
            userid={props.userid}
          />
        ))}
      </List>
    :
      null
    }
  </Paper>
);

export default SearchList;
