import React, { useState } from 'react';
import Game from './Game/Game';
import Form from './Form/Form';
import './App.css';

const App = () => {
  const [Player1, setPlayer1] = useState('');
  const [Player2, setPlayer2] = useState('');
  const [submit, setSubmit] = useState(false);

  const onSubmitHandler = (P1, P2, e) => {
    e.preventDefault();
    setPlayer1(P1);
    setPlayer2(P2);
    setSubmit(true);
  };

  const newGame = () => {
    setSubmit(false);
  };

  return (
    <div className="AppContainer">
      {submit ? (
        <div>
          <Game player1={Player1} player2={Player2} newGame={newGame} />
        </div>
      ) : (
        <div>
          <Form onsubmit={onSubmitHandler} />
        </div>
      )}
    </div>
  );
};
export default App;
