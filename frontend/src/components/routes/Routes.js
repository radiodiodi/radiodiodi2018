import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../common/Header';
import Footer from '../common/Footer';
import Frontpage from '../pages/frontpage/Frontpage';
import Sponsors from '../pages/sponsors/Sponsors';
import Registration from '../pages/registration/Registration';
import Library from '../pages/library/Library';
import Admin from '../pages/admin/Admin';
import Login from '../pages/admin/Login';
import Guide from '../pages/guide/Guide';
import Cookie from 'universal-cookie';

class Routes extends Component {
  constructor() {
    super();
    this.state = {};
    this.changeLanguage = this.changeLanguage.bind(this);
    this.cookie = new Cookie();
  }

  static contextTypes = {
    trans: PropTypes.any,
    faq: PropTypes.any,
  }

  changeLanguage() {
    const { trans, faq } = this.context;
    const prevLang = trans.getLanguage();
    const lang = prevLang === 'fi' ? 'en' : 'fi'
    trans.setLanguage(lang);
    faq.setLanguage(lang);
    this.cookie.set('lang', lang);
    this.setState({});
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Header changeLanguage={this.changeLanguage} />
          <Switch>
            <Route exact path="/" component={Frontpage} />
            <Route path="/sponsors" component={Sponsors} />
            <Route path="/ilmo" component={Registration} />
            <Route path="/guide" component={Guide} />
            <Route path="/admin" component={Admin} />
            <Route path="/login" component={Login} />
            <Route path="/library" component={Library} />
            <Route component={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

export default Routes;
