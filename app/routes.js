import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import AddWebsite from './components/AddWebsite';
import WebsiteList from './components/WebsiteList';
import Login from './components/Login';

export default (
  <Route component={App}>
    <Route path='/' component={Login} />
    <Route path='/addWebsite' component={AddWebsite} />
    <Route path='/sites' component={WebsiteList} />
  </Route>
);
