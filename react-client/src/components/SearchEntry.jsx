/* jshint esversion: 6 */

import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import expandMore from 'material-ui/svg-icons/navigation/expand-more';
import Avatar from 'material-ui/Avatar';
import ContentAdd from 'material-ui/svg-icons/content/add';
import axios from 'axios';

const SearchEntry = (props) => {
  const { show } = props;
  if (show.image === undefined) {
    show.image = './images/mickey.png';
  }

  const addShow = () => {
    axios.post('/shows', {
      show,
      userID: props.userID,
    })
      .then(() => {
        props.refreshUserShows();
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  return (
    <ListItem
      key={show.LNID}
      primaryText={show.title}
      leftAvatar={<Avatar src={show.image} />}
      rightIcon={<expandMore />}
      primaryTogglesNestedList
      nestedItems={[
        <ListItem
          key={show.LNID}
          primaryText={<p> {show.description} </p>}
          secondaryText={show.maker}
          rightIcon={<ContentAdd color="#00675b" onClick={addShow} />}
        />,
      ]}
    />
  );
};

SearchEntry.propTypes = {
  show: PropTypes.shape({
    LNID: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  userID: PropTypes.number.isRequired,
  refreshUserShows: PropTypes.func.isRequired,
};

export default SearchEntry;
