import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/home-page/home-page.component';
import OrderedItemsPage from './pages/ordered-items/ordered-items.component';

import './App.css';

function App({tickets}) {
  return (
    <div className="App">
      <Header />
      <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route 
            exact 
            path='/ordered-items' 
            component={OrderedItemsPage}
            //component={() => tickets ? <Redirect to='/ordered-items'/> : <Redirect to='/'/>}
            />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    tickets: state.ticket.tickets
  }
}

export default connect(mapStateToProps)(App);
