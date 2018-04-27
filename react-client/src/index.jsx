/* jshint esversion: 6 */

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import App from './app';

const getTheme = () => {
  const overwrites = {
    palette: {
      primary1Color: '#4a148c',
      primary2Color: '#7c43bd',
      primary3Color: '#12005e',
      accent1Color: '#009688',
    },
    drawer: {
      color: '#009688',
    },
  };
  return getMuiTheme(baseTheme, overwrites);
}

ReactDOM.render(
  <MuiThemeProvider muiTheme={getTheme()}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('app')
);
