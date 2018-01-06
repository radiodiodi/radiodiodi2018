import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Frontpage from '../pages/frontpage/Frontpage';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={Frontpage} />
        <Route component={() => <h1>404</h1>} />
      </Switch>
    </Router>
  );
}

export default Routes;
