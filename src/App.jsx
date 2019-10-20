import { hot } from 'react-hot-loader';

import React from 'react';

function App() {
  return (
    <div>
      <header>
        <p>Kukucs</p>
        <a href="https://reactjs.org">Learn React</a>
      </header>
      <h1>Holly molly! Its working</h1>
      <h2>It also reloads</h2>
    </div>
  );
}

export default hot(module)(App);
