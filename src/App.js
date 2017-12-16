import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NewJokes from './containers/NewJokes'
import TopFiveJokes from './containers/TopFiveJokes'
import BottomFiveJokes from './containers/BottomFiveJokes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">THINGS MY DAD SEZ</h1>
        </header>
        <TopFiveJokes />
        <BottomFiveJokes />
        <NewJokes />
      </div>
    );
  }
}

export default App;
