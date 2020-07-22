import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import Timer from '../asset/Timer.jpg';
import Style from './Game.css';

const Game = (props) => {
  const [value, setValue] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(false);
  const [gamefinish, setGameFinish] = useState(true);
  const [playerName, setPlayerName] = useState(props.player2);
  const [gamestart, setGameStart] = useState(false);
  const [player1NameStyle, setPlayer1NameStyle] = useState('playerName');
  const [player2NameStyle, setPlayer2NameStyle] = useState('playerName');
  const [seconds, setSeconds] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [gameDrawn, setGameDrawn] = useState(false);

  const onStartGameHandler = () => {
    setGameStart(true);
    setPlayer1NameStyle('playerName playerNameActive');
    setIsActive(true);
    setGameFinish(true);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const stopTimer = () => {
    setIsActive(false);
    setSeconds(-2);
    setGameStart(false);
  };

  const drawnTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setGameStart(false);
  };

  if (seconds === -1) {
    stopTimer();
    setPlayer1NameStyle('playerName');
    setPlayer2NameStyle('playerName');
  }

  const onClickHandler = (index) => {
    if (value[index] === null && gamestart && gamefinish) {
      let currentValue = value;
      currentValue[index] = player;
      setValue(currentValue);
      setPlayer(player === 'X' ? 'O' : 'X');
      setPlayerName(
        playerName === props.player2 ? props.player1 : props.player2
      );
      setPlayer1NameStyle(
        player1NameStyle === 'playerName playerNameActive'
          ? 'playerName'
          : 'playerName playerNameActive'
      );
      setPlayer2NameStyle(
        player2NameStyle === 'playerName'
          ? 'playerName playerNameActive'
          : 'playerName'
      );
      setSeconds(5);
    }
    checkwinner();
  };

  const checkwinner = () => {
    let winlist = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winlist.length; i++) {
      const [a, b, c] = winlist[i];
      if (value[a] && value[a] === value[b] && value[a] === value[c]) {
        setWinner(true);
        setGameFinish(false);
        stopTimer();
        setPlayer1NameStyle('playerName');
        setPlayer2NameStyle('playerName');
      }
    }
    if (value.every((element) => element !== null)) {
      drawnTimer();
      setGameDrawn(true);
      setPlayer1NameStyle('playerName');
      setPlayer2NameStyle('playerName');
    }
  };

  const onResetHandler = () => {
    // setGameStart(gamestart);
    setPlayer1NameStyle('playerName');
    setIsActive(false);
    setValue(Array(9).fill(null));
    setPlayer2NameStyle('playerName');
    setSeconds(5);
    setPlayerName(props.player2);
    setWinner(false);
    setPlayer('X');
    setGameDrawn(false);
  };

  const Winner = winner
    ? `${playerName} wins!`
    : seconds === -2
    ? `Time up! ${playerName} wins!`
    : gameDrawn
    ? 'Game drawn'
    : null;

  return (
    <div className="gameContainer">
      <div className="timer">
        <img src={Timer} alt="timer" className="timerimage" />
        {isActive ? `${seconds}s remaining` : null}
      </div>

      <div className="startContainer">
        <div className={player1NameStyle}>{props.player1}</div>
        <div className="buttonContainer">
          <button
            className="startButton"
            onClick={(e) => onStartGameHandler(e)}
          >
            Start
          </button>
        </div>
        <div className={player2NameStyle}>{props.player2}</div>
      </div>
      <div className="boardContainer">
        {value.map((ch, index) => {
          return (
            <Button
              Value={ch}
              onclicked={() => {
                return onClickHandler(index);
              }}
              key={index}
            />
          );
        })}
      </div>
      <div className="buttonsContainer">
        <button onClick={() => onResetHandler()} className="resetButton">
          Reset
        </button>
        <button onClick={() => props.newGame()} className="newGameButton">
          New Players
        </button>
      </div>

      <div className="winner">{Winner}</div>
    </div>
  );
};
export default Game;
