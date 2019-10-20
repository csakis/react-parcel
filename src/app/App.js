import React from "react";
import Board from "./components/Board";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Container, Heading, Columns} from "react-bulma-components";

const divStyle= {
  width: '800px'
};

function App() {
  return (
    <Container className="has-text-centered" style={divStyle} >
      <Heading>Redux Tic Tac Toe Chrome Extension</Heading>
      <Columns>
        <Columns.Column size="one-third" offset="one-third" >
          <Board />
        </Columns.Column>
      </Columns>
    </Container>
  );
}

export default App;
