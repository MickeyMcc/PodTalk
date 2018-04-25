import React from 'react';
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
    console.log(show, props.userID);
    axios.post('/shows', {
      show,
      userID: props.userID,
    })
      .then(() => {
        console.log('done@', props, props.refreshUserShows);
        props.refreshUserShows();
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  return (
    <ListItem
      primaryText={show.title}
      leftAvatar={<Avatar src={show.image} />}
      rightIcon={<expandMore />}
      primaryTogglesNestedList
      nestedItems={[
        <ListItem
          primaryText={<p> {show.description} </p>}
          secondaryText={show.maker}
          rightIcon={<ContentAdd color="#00675b" onClick={addShow} />}
        />,
      ]}
    />
  );
};

export default SearchEntry;
