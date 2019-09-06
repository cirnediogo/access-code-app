import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Register from './containers/Register/Register';
import Auth from './containers/Auth/Auth';

class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/auth" component={Auth} />
            <Redirect from="/" to="/auth" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
