import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Frontpage from '../pages/frontpage/Frontpage';

function Routes() {
  return (
    <Router>
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Frontpage} />
          <Route component={() => <h1>404</h1>} />
        </Switch>
        <Footer />
      </Fragment>
    </Router>
  );
}

export default Routes;
