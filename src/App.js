import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import store from './store';
import {Provider} from 'react-redux';
import World from "./components/World";




class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <World />
        </div>
      </Provider>
    );
  }
}

export default App;
