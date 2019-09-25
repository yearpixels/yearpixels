import React, { Component, Fragment } from 'react'
import Home from './Home';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from './utils';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline/>
        <MuiThemeProvider theme={theme}>
          <Home/>
        </MuiThemeProvider>
      </Fragment>
    )
  }
}
