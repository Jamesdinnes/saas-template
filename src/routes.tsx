import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';

import LoginForm from './pages/auth/login';
import AuthContainer from './pages/auth/auth-container';

export default () => (
  <BrowserRouter>
    <Suspense fallback={<Spin />}>
      <Switch>
        <AuthContainer>
          <Route path="/" component={LoginForm} />
        </AuthContainer>
      </Switch>
    </Suspense>
  </BrowserRouter>
);
