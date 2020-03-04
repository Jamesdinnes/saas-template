import React from 'react';
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

const AuthContainer = ({ children }) => (
  <Layout>
    <Header>Header</Header>
    <Content>{children}</Content>
    <Footer>Footer</Footer>
  </Layout>
);

export default AuthContainer;
