import { hot } from 'react-hot-loader/root';
import { configure } from 'axios-hooks';
import React from 'react';
import LRU from 'lru-cache';
import Axios from 'axios';
import 'antd/dist/antd.css';
import Routes from './routes';
import { DEFAULT_API_URL } from './config/api.config';

const axios = Axios.create({
  baseURL: DEFAULT_API_URL,
});

const cache = new LRU({ max: 10 });

configure({ axios, cache });

const App = () => <Routes />;

export default hot(App);
