import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Btn2 from './Btn2';

const App = () => (
  <Container
    style={{
      width: '300px',
      'padding-bottom': '15px',
    }}
  >
    <CssBaseline />
    <h2>Ip address parser</h2>
    <Btn2 />
  </Container>
);

export default App;
