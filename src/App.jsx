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
      <h2>Does it reload?</h2>
      look at that
    </div>
  );
}

export default hot(module)(App);
