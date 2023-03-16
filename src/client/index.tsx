import * as React from 'react';
import { render } from 'react-dom';
// import { ThemeContext } from 'Context';
import { ThemeProvider } from '@friendsofreactjs/react-css-themr';
import MainRouter from 'Route';
// import {DeliciousThemeContext} from 'engage-ui/themes/Delicious/index';

export const DeliciousThemeContext = {
  PButton: require('engage-ui/themes/Delicious/Button.scss'),
  PButtonGroup: require('engage-ui/themes/Delicious/ButtonGroup.scss'),
  PConnected: require('engage-ui/themes/Delicious/Connected.scss'),
  PDisplayText: require('engage-ui/themes/Delicious/DisplayText.scss'),
  PIcon: require('engage-ui/themes/Delicious/Icon.scss'),
  PLabel: require('engage-ui/themes/Delicious/Label.scss'),
  PLabelled: require('engage-ui/themes/Delicious/Labelled.scss'),
  PMessage: require('engage-ui/themes/Delicious/Message.scss'),
  PModal: require('engage-ui/themes/Delicious/Modal.scss'),
  PSelect: require('engage-ui/themes/Delicious/Select.scss'),
  PTextField: require('engage-ui/themes/Delicious/TextField.scss'),
};

const content = (
  // @ts-ignore
  <ThemeProvider theme={DeliciousThemeContext}>
    <MainRouter />
  </ThemeProvider>
);

/**
 * Render the router and the whole application to a #react-app element
 */
render(content, document.getElementById('react-app'));
