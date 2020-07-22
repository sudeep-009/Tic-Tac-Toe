import React, { useState } from 'react';
import Tictactoe from '../asset/tic-tac-toe.jpg';
import Style from './Form.css';

const Form = (props) => {
  const [Player1, setPlayer1] = useState('');
  const [Player2, setPlayer2] = useState('');

  return (
    <div>
      <img src={Tictactoe} className="logo" />
      <h3>Lets Play the Game Tic-tac-toe</h3>
      <form
        className="form"
        onSubmit={(e) => props.onsubmit(Player1, Player2, e)}
      >
        <input
          type="text"
          placeholder="Enter Player 1"
          name="Player 1"
          value={Player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />
        <p>Vs</p>
        <input
          type="text"
          placeholder="Enter Player 2"
          name="Player 2"
          value={Player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />
        <button
          type="submit"
          disabled={!Player1 && !Player2}
          className="submitButton"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Form;
