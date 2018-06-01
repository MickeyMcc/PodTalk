import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import CommentMode from 'material-ui/svg-icons/editor/mode-comment';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { grey } from 'material-ui/styles/colors';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Tabs, Tab } from 'material-ui/Tabs';
import EpisodeEntry from './EpisodeEntry';
import { IconStyle } from '../styles';

const ShowDialog = (props) => {
  const { show, userID } = props;

  return (
    <div>
      <IconButton onClick={props.removeShow}>
        <Delete color={grey} style={IconStyle} />
      </IconButton>
      <br />
      {show.show_description}
      <Divider style={{ marginTop: 8 }} />
      <Tabs>
        <Tab label="Your Eps">
          {props.userLoading ?
            <RefreshIndicator
              size={40}
              style={{ position: 'relative' }}
              left={50}
              top={20}
              status="loading"
            />
            :
            props.userEpList.length ?
              <List style={{ maxHeight: 300, overflow: 'auto' }}>
                {props.userEpList.map(episode => (
                  <EpisodeEntry
                    episode={episode}
                    key={episode.id}
                    userID={userID}
                    showID={show.id}
                    fetchUserEps={props.fetchUserEps}
                  />
                ))}
              </List>
              :
              <div> You have not listened to any episodes of this show yet! </div>
          }
        </Tab>
        <Tab label="Recent Eps">
          {props.recentLoading ?
            <RefreshIndicator
              size={40}
              style={{ position: 'relative' }}
              left={50}
              top={20}
              status="loading"
            />
            :
            <List style={{ maxHeight: 300, overflow: 'auto' }} >
              {props.recentEpList.map(episode => (
                <EpisodeEntry
                  episode={episode}
                  key={episode.id}
                  userID={userID}
                  showID={show.id}
                  fetchUserEps={props.fetchUserEps}
                />
              ))}
            </List>
          }
        </Tab>
      </Tabs>
    </div>
  );
};

ShowDialog.propTypes = {
  show: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  userID: PropTypes.number.isRequired,
  fetchUserEps: PropTypes.func.isRequired,
  recentEpList: PropTypes.arrayOf(PropTypes.object).isRequired,
  userEpList: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeShow: PropTypes.func.isRequired,

};

export default ShowDialog;