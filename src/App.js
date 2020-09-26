import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home'
import Navbar from './components/Navbar'
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import CreateShow from './components/CreateShow';
import Profile from './components/Profile'
import EventScreen from './components/EventScreen'
import MyShows from './components/MyShows';



function App() {
  return (
    <div className="app">
        <BrowserRouter>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/createshow" component={CreateShow} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/event/:id" component={EventScreen} />
          <Route path="/myshows" component={MyShows} />
        </BrowserRouter>
    </div>
  );
}

export default App;
