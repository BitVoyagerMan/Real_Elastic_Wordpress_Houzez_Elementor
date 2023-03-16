import 'url-search-params-polyfill';
import * as React from "react";

import { Route, Router } from 'react-router'; // Adds Routing capabilities
import { browserHistory } from 'react-router';
import RoleDefComponent from './Routes/RoleDef/Components';
import PageNotFoundComponent from './Routes/PageNotFound';

export default class MainRouter extends React.Component {
  render() {
    return (
        <Router history= {browserHistory}>
            <Route path="/roleDefs" component={RoleDefComponent} />
            <Route path="*" component={PageNotFoundComponent} />
        </Router>
    );
  }
}
