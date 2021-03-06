import React, { Component } from 'react';
import './App.css';

import Footer from './components/Footer';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
