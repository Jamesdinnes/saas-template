import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';

import SessionStore from './stores/session.store';

export default () => (
  <BrowserRouter>
    <Suspense fallback={<Spin />}>
      <Switch>{/* <Route path="/auth" component={} /> */}</Switch>
    </Suspense>
  </BrowserRouter>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      SessionStore.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
